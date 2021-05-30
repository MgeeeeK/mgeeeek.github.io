# Coding Period: Last Phase Part 1


_We are in the end phase of GSOC now and less than 2 weeks are remaining for finishing up our project. My last blog focused on the working of base raster interface API which is in the beta phase as it is still being reviewed by other community members. Most of my time in the first half of this phase went in optimizing the weights builder and efficiently increasing the neighbors of the focal point, let's jump straight to the exciting stuff._

## Existing Weights Builder Design

The current approach uses `lat2SW` method which provides main functionality for constructing a sparse matrix for the regular lattice. `lat2SW` calculates diagonals and offsets for building `scipy.sparse.dia_matrix` which is then converted to `csr_matrix`, this is straightforward as regular lattice does not contain missing data or any irregularities and therefore neighbors can be calculated using the predefined method for `rook` and `queen` contiguity. The main issue while using `lat2SW` was when we're dealing with data consisting of missing values, in this case, boolean indexing is used for removing missing rows and columns from the created sparse matrix. Performance takes a hit due to boolean indexing of `csr_matrix` and this raised concerns for building weight objects for larger data. Memory consumption in `lat2SW` is also high due to the use of `lists` instead of `np.array`.

This made us consider to think about another route for creating weight objects, a route where the builder only includes elements from the (non-missing) data from the beginning, unlike the approach I talked about earlier. 

To create a matrix with only non-missing values in mind, `lat2SW`/`dia_matrix` was out of the question since it is highly oriented towards building regular lattice. Next options were to build either [DOK](https://docs.scipy.org/doc/scipy/reference/generated/scipy.sparse.dok_matrix.html#scipy.sparse.dok_matrix), [CSR/CSC](https://docs.scipy.org/doc/scipy/reference/generated/scipy.sparse.csr_matrix.html#scipy.sparse.csr_matrix), or [COO](https://docs.scipy.org/doc/scipy/reference/generated/scipy.sparse.coo_matrix.html#scipy.sparse.coo_matrix)...
- It was impossible (for me) to Numba-fy `DOK` builder due to its structure and without `numba` it was too slow.
- In case of `CSR/CSC` I was not able to think of a multithreaded implementation.
- From the start I was biased towards `COO` as its structure is quite simple, can be numba-fied, fairly easy to incorporate multithreading, and fast conversion to `CSR/CSC` matrix.

And therefore I went ahead with `coo_matrix`, next part explains this in detail.

## New Weights Builder

Constructing `coo_matrix` with only non-missing data was still a tricky problem since I had to know the original ids and the position ids after removing all the missing data. To solve this issue I had to create an `id_map` (1d array) of length = (missing + non-missing)data, where each ids of non-missing values contained the index values of non-missing data after removing all missing data. After this, the method uses modular arithmetic and continuous checking for creating row and col arrays only for non-missing neighbors and since this is not vectorized there was a high requirement of incorporating `numba` to the builder. 

Up until now I never knew what `numba` really was or how it worked, luckily I was familiar with technical details of `cython` and after reading `numba` documentation I got a clear idea of how `numba` worked.

> How does Numba work?
> 
> Numba reads the Python bytecode for a decorated function and combines this with information about the types of the input arguments to the function. It analyzes and optimizes your code, and finally uses the LLVM compiler library to generate a machine code version of your function, tailored to your CPU capabilities. This compiled version is then used every time your function is called.

Since the new sparse matrix implementation involved traversing a huge for loop, `numba` substantially improved the performance of builder, please check [this notebook](https://github.com/MgeeeeK/GSoC2020/blob/master/raster%20weights%20builder.ipynb) for performance overview. It can be seen that the new method is much better in terms of both scalability and efficiency, we can also see that without numba the new method will be of no use as the difference is of night and day. Now if you thought that this is it (if you're someone who is not familiar with the project already) then nope, there is one more level to make this more efficient which is through parallel processing.

## Parallel Implementation

For making the program run parallelly there was a need for restructuring how it handles passed data, we've to divide the workload into smaller workloads which will run on each thread or a process simultaneously, after all the workloads are finished we'll combine all the results thus obtaining desired output. Luckily this [pr #116](https://github.com/pysal/esda/pull/116) helped me a lot to understand proper implementation for making weights builder work parallelly. Let's go through the implementation:
- There are 3 main components to build parallel pipeline, first is the base compute method which in our case is numbafied method that generates `rows` and `cols` array, second is the method which will divide our data for smaller workload, and third is the main method which will be called to initiate the parallel pipeline, this method creates the parallel instance and then combines the output of each instance into the desired results.
- First step in my case was to analyze the arguments that the new weight builder needed, which are 2 arrays and 4 static variables. `id_map` and `ids` are the 2 arrays where `ids` contained the index of non-missing data (`id_map` is already explained earlier). We needed complete `id_map` to build `rows` and `cols` arrays so there was no need of modifying it, but to divide workload we sliced the `ids` array into n equal parts, where n is the number of workloads we have to divide (typically n this is equal to the total number of threads in our computer).
- We can use an iterator or a generator to create equal parts of `ids`. Let's say if the length of our `ids` array is 100 and the value of `n` is 4 then the generator we'll generate 4 chunks of `ids` array. In this case, we created an array which consisted of starting index of each chunk in this case it consists `[0, 25, 50, 75]`.
  - chunk1 -> ids[0:25]
  - chunk2 -> ids[25:50]
  - chunk2 -> ids[50:75]
  - chunk2 -> ids[75:100]
- After creating the required chunk generator, we implemented the main method we use delayed function to create n lists of workload for each parallel instance and each `ids` argument in this list consisted of the `ids_chunk` calculated in the second step. After the processing is finished we obtained a tuple containing the output of n instances.
- The final step is to assemble and combine the parallel output into our desired results which in this case was merging n `rows` and n `cols`.

Now there are different ways to parallelize the workloads. `joblib` offers 3 backends `loky`, `threading`, and `multiprocessing`. This opens up the discussion of threads-based vs process-based parallelism:

>Thread-based parallelism vs Process-based parallelism
>
>By default `joblib.Parallel` uses the `loky` backend module to start separate Python worker processes to execute tasks concurrently on separate CPUs. This is a reasonable default for generic Python programs but can induce a significant overhead as the input and output data need to be serialized in a queue for communication with the worker processes (see Serialization & Processes).
>
>When you know that the function you are calling is based on a compiled extension that releases the Python Global Interpreter Lock (GIL) during most of its computation then it is more efficient to use threads instead of Python processes as concurrent workers. For instance, this is the case if you write the CPU intensive part of your code inside a with nogil block of a Cython function.

[pr #116](https://github.com/pysal/esda/pull/116) uses `loky` backend and therefore I started with the same. But in the case of rasters the memory footprint of using `loky` backend was huge, combined with worse performance than the single-threaded approach I had to think of another way. I stumbled upon `threading` backend but this required me to release the Python Global Interpreter Lock which can be risky otherwise threads will not run parallely (here I ask you to [google](https://www.google.com/search?q=python+release+gil+disadvantages) those risks, this blog has already become enormous). But in the current builder all the arguments are static and are not bound to change during the computations and therefore I continued with `threading` backend and since the compute method uses `numba` it was relatively easy to release the `gil` through `nogil=True` argument inside the decorator. 

The multi-threading approach resulted in a small performance boost as the main bottleneck was still constructing `COO_matrix` and then converting it to `csr_matrix`. But overall this was superior to the `lat2SW` approach in every way, here is the [link](https://github.com/MgeeeeK/GSoC2020/blob/master/.ipynb_checkpoints/optimized_weight_builder-checkpoint.ipynb) to the second notebook for performance overview. I've also provided the link to the `numba` and `joblib` documentation for a better understanding of the subject.

## Additional resources

1. [A ~5-minute guide to Numba](https://numba.pydata.org/numba-doc/latest/user/5minguide.html)
2. [Embarrassingly parallel for loops](https://joblib.readthedocs.io/en/latest/parallel.html)


## What's next?

I'm glad that I was able to become part of the PySAL community, I've developed in so many aspects during GSoC. The program is about to end in 2 weeks, I'm still working on efficiently increasing the neighbors in the weights object alongside visualization part of the raster interface.

Wait for my last blog which will be little light and casual, and will tell about what is coming in future... goodbye moonmen 👋.
