# GSoC2020 Project Report

## Project Details

| Field              | Value                                                                                                                                         |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| _Project Title_    | Raster Awareness in PySAL                                                                                                                     |
| _Project Link_     | https://summerofcode.withgoogle.com/projects/#5775104799145984                                                                                |
| _Organization_     | [NumFOCUS](https://numfocus.org/) (Sub-Org: [PySAL](http://pysal.org/pysal))                                                                  |
| _Mentors_          | [Stefanie Lumnitz](https://github.com/slumnitz), [Dani Arribas-Bel](https://github.com/darribas), [Levi John Wolf](https://github.com/ljwolf) |
| _Contributed Repo_ | [libpysal](https://github.com/pysal/libpysal), [splot](https://github.com/pysal/splot)                                                        |
| _Working Repo_     | [Mgeeeek/libpysal](https://github.com/MgeeeeK/libpysal)                                                                                       |
| _Gitter Room_      | https://gitter.im/GSoC2020-PySAL/Raster_awareness_in_PySAL                                                                                    |
| _Project Blog_     | https://mgeeeek.github.io/tags/gsoc/                                                                                                          |

## Project Description

From early on, `PySAL` was designed with the focus of performing vector-based spatial analysis and therefore it didn't have tools to handle input-output of large raster data. This restricted some folks in the geospatial community to use `PySAL`'s analytical functionality over raster data. Furthermore, in recent years several geographic data organizations started releasing data in raster format which earlier came in vector format mostly because of advancement in computational capabilities and high storage availability. This led to an increase in the demand for the functionality offered by `PySAL` to make it work with raster data.

Taking this into consideration, my main motive was to design and implement a lightweight interface which will provide the functionality for streamlining raster data access and making it more accessible to build the data structure accepted by the analytical methods of the PySAL library (mainly `libpysal.weights.W/WSP` objects) from accessed raster data (which will be an instance of `xarray.DataArray`). Ultimately, this functionality will open up the use of analytical methods like `esda`, `spatial regression` over raster data.

Following were the major milestones that we planned to finish for successfully building raster interface:

- Design quality APIs which followed existing structure used across PySAL.
- Deal with different properties of raster including missing data values, different data alignment, and multi-layer data.
- Add transformational methods to support conversion to and from PySAL weights object and `xarray.DataArray` object.
- Integrate the interface with PySAL without causing any disturbance to other parts of the library.
- Study performance and memory efficiency of the conversion methods and optimize the interface to support computations for large raster datasets.
- Add proper documentation, tests, and an example notebook.

Since in this report we'll talk a lot about raster data and weights object, let's look at the visualization of these 2 things. Weights object in `PySAL` is a graph like structure which expresses the relationship of a spatial point with its neighboring points. We can now take a look at the visual example below:
![Fig. 1](https://user-images.githubusercontent.com/40512095/91647853-83b96b80-ea7d-11ea-8002-641ce7dc621d.png)
_This figure consist of 2 plots of weights object (which are listed below) and 2 of raster data. These weights objects were obtained using a sliced raster. We can see the relationship of spatial points is different in `Rook` and `Queen` contiguity, interface dealt with `nodatavals` while creating the weights object thats why we are seeing those empty pixels._  
![Fig. 2](https://user-images.githubusercontent.com/40512095/91647893-325dac00-ea7e-11ea-84d3-ac6882fc5231.png)

_The development timeline for building the project was divided into 3 phases:_

1. _API design phase_
2. _Integration phase_
3. _Optimization phase_

### API design phase

**Quick Overview**

Main goals achieved:

- Studied data structures provided by `xarray` and PySAL's `W` and `WSP` objects.
- Created an initial skeletal implementation of the interface.
- Iteratively designed and experimented with different APIs structures.
- Created a working prototype of the Base Raster Interface.

Pull Requests, Commits and Issues created:

- **Issue:** **[open]** [Idea collection/discussion for Raster awareness project](https://github.com/pysal/libpysal/issues/293#issue-629986294)
- **Commit:** [final API with working prototype](https://github.com/MgeeeeK/libpysal/commit/9eb8311605bba5f942678d7694edcc746b7ce6ee)

Blog posts published:

- [Coding Period: First Phase Part 1](https://mgeeeek.github.io/posts/2020/06/coding-period-first-phase-part-1/)
- [Coding Period: First Phase Part 2](https://mgeeeek.github.io/posts/2020/06/coding-period-first-phase-part-2/)

Contents:

1. [I/O dependency for accessing raster](https://mgeeeek.github.io/posts/2020/08/gsoc2020-project-report#io-dependency-for-accessing-raster)
2. [Planning main functionality for the interface](https://mgeeeek.github.io/posts/2020/08/gsoc2020-project-report#planning-main-functionality-for-the-interface)
3. [Designing interface's API (_weights builder_)](https://mgeeeek.github.io/posts/2020/08/gsoc2020-project-report#designing-interfaces-api-weights-builder)
4. [Designing interface's API (_return journey to `xarray.DataArray`_)](https://mgeeeek.github.io/posts/2020/08/gsoc2020-project-report#designing-interfaces-api-return-journey-to-xarraydataarray)
5. [Iterative approach for API design](https://mgeeeek.github.io/posts/2020/08/gsoc2020-project-report#iterative-approach-for-api-design)

**Detailed Summary**

1.  #### I/O dependency for accessing raster

    The original plan involved using `rasterio` as the main library for raster data access but from the start of the community bonding period, my mentors suggested a shift from `rasterio` to `xarray`. After going through the documentation of `xarray` it felt superior in terms of usability and accessibility as the features it provided outweighed that of `rasterio` and it also featured `rasterio` backend to access the raster data formats easily. Moreover, building the interface to work with the data structure provided by the `xarray` library made the project available to a broader audience. Therefore I continued with the `xarray` or `xarray.DataArray` to be specific, as users can easily obtain `xarray.DataArray` object from raster data format using `xarray`'s I/O functionality which can read from a variety of data formats some of them are listed below:

    - [GDAL Raster Formats](https://svn.osgeo.org/gdal/tags/gdal_1_2_5/frmts/formats_list.html) via `open_rasterio` method.
    - [NetCDF](https://www.unidata.ucar.edu/software/netcdf/) via `open_dataset` method.

2.  #### Planning main functionality for the interface

    After understanding the structure of `xarray.DataArray`, it was time to create an initial skeletal implementation of the interface which provided details of the functionality that the interface will offer. As described by Dani in this [thread](https://github.com/pysal/libpysal/issues/293#issuecomment-638446405):

    - The interface would provide the functionality to create both weights object `libpysal.weights.W` & `WSP` from user-provided data though `xarray.DataArray` object.
    - It should also support the return journey of the data obtained after an analytical operation on the weights object to `xarray.DataArray`.

3.  #### Designing interface's API (_weights builder_)

    Once the main functionality was finalized, we jumped on to the API designing part of the project. My mentors explained how PySAL was inclined towards an object-oriented paradigm and the majority of the operations are achieved through creating an instance of a particular object using the class method and then calling the instance method. But it was also in the transitioning phase of incorporating functional programming though it was not on the top of their priority list. This motivated us to provide the functionality of direct function calling to convert `DataArray` and create respective weights object, but also implement these methods as a class method using contiguity classes (`Rook` and `Queen`).

    ```python
    from libpysal.weights import raster, Rook
    import xarray as xr

    # Accessing raster data using xarray
    da = xr.open_rasterio("raster.tif")

    # Method 1
    wsp1 = raster.da2WSP(da, criterion="rook")
    data1 = da.to_series()[wsp1.index]

    # Method 2
    wsp2 = Rook.from_xarray(da, sparse=True)
    data2 = da.to_series()[wsp2.index]

    data1.equals(data2)
    ```

        True

4.  #### Designing interface's API (_return journey to `xarray.DataArray`_)

    In the above example, `.from_xarray` method uses direct methods like `da2W` or `da2WSP` under the hood to build weights object from `xarray.DataArray`. A new module called `raster` was introduced to hold all the functionalities offered by the interface, it also helped in structuring the interface by separating it with other areas of the library. Just like what we saw with `.from_xarray` method, all the work related to the raster conversion is dispatched to one of the methods in the `raster` module.

    A similar approach was taken for designing the API for the return journey. We implemented 2 types of methods:

    - `toDataArray` which can be called directly.
    - Another way was to call the instance method `.to_xarray` which provided similar functionality to the direct methods.

    In the later phase, `.to_xarray` method was removed due to several limitations because the structure of created weights object was different from the normal ones (more on this later), and therefore these methods would fail if the user passed the weights object not created using the interface.

5.  #### Iterative approach for API design

    It took quite a few iterations to finalize the correct API of the base interface. Below are the early pull requests that I pushed to get feedbacks for the API of the transformational functions. These are far from clean as I was still experimenting with different design decisions.

    - **PR:** [**Closed**] [Raster Interface v1](https://github.com/MgeeeeK/libpysal/pull/1)
    - **PR:** [**Closed**] [Raster Interface v2](https://github.com/MgeeeeK/libpysal/pull/3)
    - **PR:** [**Closed**] [Raster Interface v3](https://github.com/MgeeeeK/libpysal/pull/4)

    Commit [9eb8311](https://github.com/MgeeeeK/libpysal/commit/9eb8311605bba5f942678d7694edcc746b7ce6ee) was the point of the 1st phase where the majority of the APIs were locked. There were still some areas left where the community was divided particularly in structuring and naming the parameters of the methods, but these were minor issues that were solved in the later stages.

### Integration phase

**Quick Overview**

Main goals achieved:

- Restructured interface by aligning the methods with future weights object design.
- Made `toDataArray` method work independent of raster metadata.
- Added `KNN` weights support to the interface.
- Fixed documentation, by following the NumPy-Doc convention for docstrings.
- Added unit-tests and an example notebook.
- Explored different ways to optimize the interface.

Pull Requests, Commits and Issues created:

- **PR:** **[merged]** [Base raster interface](https://github.com/pysal/libpysal/pull/318)
- **Issue:** **[open]** [Idea collection/discussion for Raster awareness project](https://github.com/pysal/libpysal/issues/293#issuecomment-651636142)

Blog posts published:

- [Coding Period: Second Phase Part 1](https://mgeeeek.github.io/posts/2020/07/coding-period-second-phase-part-1/)
- [Coding Period: Second Phase Part 2](https://mgeeeek.github.io/posts/2020/07/coding-period-second-phase-part-2/)

Contents:

1. [Refactoring weights object](https://mgeeeek.github.io/posts/2020/08/gsoc2020-project-report#refactoring-weights-object)
2. [Refactoring `toDataArray` method](https://mgeeeek.github.io/posts/2020/08/gsoc2020-project-report#refactoring-todataarray-method-making-it-work-with-only-weights-object-and-independent-of-metadata)
3. [Adding distance-based weights object support](https://mgeeeek.github.io/posts/2020/08/gsoc2020-project-report#adding-distance-based-weights-object-support)
4. [Finalzing base raster interface](https://mgeeeek.github.io/posts/2020/08/gsoc2020-project-report#adding-tests-documentation-example-notebook-and-finalizing-base-raster-interface)
5. [Identifying areas to optimize](https://mgeeeek.github.io/posts/2020/08/gsoc2020-project-report#identifying-areas-to-optimize-for-adding-support-for-large-rasters)

**Detailed Summary**

1.  #### Refactoring weights object

    In the second phase, we focused on how to integrate the interface with the libpysal. One major issue related to the integration was that the output weights of the transformation methods (`da2W`/`da2WSP`) were different from the normal weights object, this was due to the extra attributes added to the weights object namely `attrs` and `coords`. This addition was implemented in the builder method to make the weights object more interactable with `xarray.DataArray` as the user will want to access the raster data easily after building the weights from the DataArray. Therefore `coords` attribute stored the coordinates indices of non-missing values in the form of `pandas.MultiIndex`, and `attrs` stored the metadata which was required when going back to the `xarray.DataArray`. This issue was addressed in the community meeting. After a detailed meeting with community members regarding the weights object, one of the major change that was proposed was to shift towards `WSP` object (here are the [meeting notes](https://hackmd.io/Fozkz1IRQlK6GYVKI8mF9Q?both)). Additionally, the `id_order` attribute will be replaced by `index` which will contain an instance of `pandas.Index` aligned with the `ids` of the weight object.

    This required a few changes in my existing implementation:

    - Renamed `coords` to `index` and removed `attrs` attribute.
    - Added `index` parameter in the `__init__` method of `WSP` class.
    - Fixed creation of `W` from `xarray.DataArray` which now only relies on `da2WSP` method.

2.  #### Refactoring `toDataArray` method, making it work with only weights object and independent of metadata

    A few of the major changes added during the second phase involved the `toDataArray` method. To make the interface more accessible we decided to only build the `DataArray` from _weights object_ and _data values aligned to the weights object_. This was tricky as the weights object does not contain any information related to the missing values except the coordinates in the `index` attribute. After several tries of my own, I shifted towards the source code of the `pandas.MultiIndex`. From my earlier impressions, the data structure of `pandas.MultiIndex` was very different. Once I understood the architecture of `pandas.MultiIndex` I pushed a patch with the required changes, this patch refactored the logic and used the `codes` and `levels` property to construct all the coordinates of the `DataArray`. Commit [e5cd4e6](https://github.com/MgeeeeK/libpysal/commit/e5cd4e69cbc840fb9eb229e31f126068efd476af) reflects the changes made targeting this method. Later `toDataArray` was split into 2 separate functions `w2da` and `wsp2da`. We can see the use of this functionality below:

    ```python
    from libpysal.weights import raster, Queen

    # Creating test DataArray
    da = raster.testDataArray(
        shape=(10, 56, 49),
        time=False,
        rand=False,
        missing_vals=True
    )

    wsp = Queen.from_xarray(
        da=da,
        z_value=5,
        coords_label=None,
        sparse=True
    )

    # Accessing data from da using index attribute
    data = da.to_series()[wsp.index]

    # Converting back to the DataArray
    da_back = wsp2da(data, wsp)
    da_back
    ```

        <xarray.DataArray (band: 1, y: 56, x: 49)>
        -1 211 -1 -1 -1 41 37 -1 62 -1 ... -1 171 118 135 28 151 -1 -1 -1 146
        Coordinates:
        * band     (band) int64 5
        * y        (y) float64 66.1 66.2 66.3 66.4 66.5 ... 71.2 71.3 71.4 71.5 71.6
        * x        (x) float64 92.1 92.2 92.3 92.4 92.5 ... 96.5 96.6 96.7 96.8 96.9
        Attributes:
            nodatavals:  (-1,)

3.  #### Adding distance-based weights object support

    `Rook` and `Queen` contiguities were not sufficient when considered for further analysis on a raster data because `Rook` contiguity provided max 4 neighbors and `Queen` provided max 8. To tackle this, the next step was to implement distance weight builder either `KNN` or `DistanceBand`. We started with `KNN`, the initial implementation of `KNN` was very straight forward, we first converted cell centroids into points and then shipped them directly into the `KNN` builder which is based on `KDTree`. There were 2 major issues with this implementation first was very obvious as raster provided a regular lattice-like structure, `KNN` could have been more optimized since there was no need for building `KDTree`. Though the major issue was related to the ordering of the selected neighbors. Since in raster more than 2 neighbors can be equidistant from the focal point, the method inconsistently selected neighbors in a different environment. Therefore this was later removed from the project.

4.  #### Adding tests, documentation, example notebook, and finalizing base raster interface

    Once all the components of the base raster Interface were finalized, we started working on the documentation and tests. From the beginning I followed the style of other methods inside libpysal when creating docstrings, luckily my mentors notified me early on to follow NumPy-Doc convention for docstrings. After fixing docstring we worked on adding unit-tests since we were not storing any raster dataset inside the project therefore we decided to create a `testDataArray` method (usage provided in the above example) which provided us with the different dataset to test interface correctly.

    I also added an example notebook that introduced the API of the interface and gave a brief overview of its use-case in different scenarios. The notebook can be accessed from here:

    - [Example Notebook](https://github.com/MgeeeeK/libpysal/blob/rast_interface/notebooks/Raster_awareness_API.ipynb)

    Commits [6565dd0](https://github.com/MgeeeeK/libpysal/commit/6565dd0f84768203a1c5f5cd2833cf91d6f30af3) to [94ec4f4](https://github.com/MgeeeeK/libpysal/commit/94ec4f4bc9746a235cbaa3486d06b33d76350249) contains the majority of work finalized in the second phase. Since the main API of the base interface was finalized, I created a pull request targeting the master branch of libpysal:

    - **PR:** **[merged]** [Base raster interface](https://github.com/pysal/libpysal/pull/318)

    **Note:** All my main work for the _first_ and _second_ phase lives inside this pull request. The commit history doesn't look clean as for some reason I forced pushed a few changes.

5.  #### Identifying areas to optimize for adding support for large rasters.

    Along with working on the interface we were also identifying and exploring the different optimization methods to optimize the interface. This thread documents list of ideas we went through during exploration.

    - [Idea collection for Raster awareness project](https://github.com/pysal/libpysal/issues/293#issuecomment-651636142)

### Optimization phase

**Quick Overview**

Main goals achieved:

- Shifted away from `lat2SW`-based weight builder.
- Redesigned sparse matrix builder based on `COO_matrix`.
- Numba-fied all possible methods using `njit` decorator.
- Added multi-threaded implementation for WSP builder using `joblib`.
- Added `higher_order` functionality to the modified weight builder.
- Added raster-based weights object support inside `plot_spatial_weights` method in `splot`.

Pull Requests, Commits and Issues created:

- **PR:** **[WIP]** [Optimized raster-based weights builder](https://github.com/pysal/libpysal/pull/343)
- **PR:** **[WIP]** [Added raster weights plotting functionality](https://github.com/pysal/splot/pull/113)
- **Issue:** **[open]** [Distance Band functionality for Raster Interface weights](https://github.com/pysal/libpysal/issues/328)
- **Issue:** **[open]** [plotting for `libpysal` raster functionality](https://github.com/pysal/splot/issues/112)

Blog posts published:

- [Coding Period: Last Phase Part 1](https://mgeeeek.github.io/posts/2020/08/coding-period-last-phase-part-1/).

Contents:

1. [Moving on from `lat2SW`-based sparse weight builder](https://mgeeeek.github.io/posts/2020/08/gsoc2020-project-report#moving-on-from-lat2sw-based-which-uses-dia_matrix-to-new-coo_matrix-based-sparse-weight-builder)
2. [Optimizing the addition of higher-order neighbors](https://mgeeeek.github.io/posts/2020/08/gsoc2020-project-report#optimizing-the-addition-of-higher-order-neighbors)
3. [Adding visualization support for the interface](https://mgeeeek.github.io/posts/2020/08/gsoc2020-project-report#adding-visualization-support-for-the-interface)

**Detailed Summary**

1. #### Moving on from `lat2SW`-based (which uses `dia_matrix`) to new `coo_matrix`-based sparse weight builder

   Following the idea-collection issue, the first target for optimizing the interface was the weight builders. The existing approach used the `lat2SW` method which provided the main functionality for constructing a sparse matrix for the regular lattice. The main issue while using `lat2SW` was when we’re dealing with data consisting of missing values, in this case, boolean indexing was used for removing missing rows and columns from the created sparse matrix. The performance takes a hit due to boolean indexing of `csr_matrix` and this raised concerns for building weight objects for larger data. Memory consumption in `lat2SW` is also high due to the use of `lists` instead of `np.array`.

   A proper explanation of this issue and how it was solved is given in this blog post.

   - **Blog:** [Coding Period: Last Phase Part 1](https://mgeeeek.github.io/posts/2020/08/coding-period-last-phase-part-1/).

   Also, check out this [notebook](https://github.com/MgeeeeK/GSoC2020/blob/master/raster%20weights%20builder.ipynb) for a performance overview. These enhancements provided huge benefits both in terms of memory efficiency and faster performance. This also made the interface usable with large datasets.

2. #### Optimizing the addition of higher-order neighbors

   In the previous section, I explained how `KNN`-based weight object was not very consistent when dealing with the raster-based data. Therefore, we decided to implement `higher_order` functionality, and 2 approaches were taken when adding the higher-order neighbors:

   - Implementing the first approach was relatively easier than the second approach, as only a few changes were added inside the modified weights builder. An extra argument was provided which acted as a `threshold` and then using modular arithmetic conditions the algorithms added the neighbors lying inside the `threshold` radius also following contiguity criterion, though this implementation was different as it added higher order neighbors even if the lower order neighbors were missing and therefore it was more like `DistanceBand`. This thread provides some insightful discussion related to how `DistanceBand` behaves with raster data:

     - **Issue:** [Distance Band functionality for Raster Interface](https://github.com/pysal/libpysal/issues/328)

   - As for the second approach, we were able to implement a correct algorithm for `higher_order` functionality inside weight builder, this algorithm used recursion to traverse nth-order neighbors or nodes because raster can be assumed as a graph. Unfortunately, we could not incorporate `numba` and `multi-threading` to the method and therefore the algorithm was very inefficient. But after some testing, we were able to add a proper algorithm for using the method that Martin suggested in this thread.

     - **Issue:** [higher_order weights of <= k](https://github.com/pysal/libpysal/issues/313)

   Since both approaches are different from each other we added `include_nas` argument which if `True`, computes weights using the first approach, and if `False` the builder uses the second approach. We can take a look at the visual example below which explains this more intuitively.
   ![Fig. 3](https://user-images.githubusercontent.com/40512095/91647908-7b156500-ea7e-11ea-9785-a7745bd28edc.png)
   _Here we used `testDataArray` method to create a small raster data filled with random and missing values. `Fig. 2` shows the `Rook` contiguity with `k=1` which means all first-order rook neighbors are selected. `Fig. 3` shows the `Rook` contiguity with `k=2` but with `include_nas=False` which means all `non-missing` first and second-order rook neighbors are selected (this uses the second approach as described previously). `include_nas` is `True` for `Fig. 4`, we can see that in this figure all the first order neighbors are selected but while selecting second order neighbors, the method takes consideration of (missing + nonmissing) first-order neighbors._
   ![Fig. 4](https://user-images.githubusercontent.com/40512095/91647911-7d77bf00-ea7e-11ea-844e-8dd547057a35.png)
   After completion of these methods, a pull request was created targeting the master branch of `libpysal` which added optimized weights builder and `higher_order` functionality. This pull request describes how these approaches are different from each other:

   - **[WIP]** [Optimized raster-based weights builder](https://github.com/pysal/libpysal/pull/343)

**This marked the end of the optimization phase.**

3. #### Adding visualization support for the interface.

   Along with optimization work, we also worked on adding the support for plotting functionality for a raster-based weight object. This required some changes inside the `plot_spatial_weights` method, mainly making it work with sparse weight objects instead of dense weight objects and adding a `da` argument for passing `DataArray` object.

   - **Issue:** **[open]** [plotting for `libpysal` raster functionality](https://github.com/pysal/splot/issues/112)
   - **PR:** **[WIP]** [Added raster weights plotting functionality](https://github.com/pysal/splot/pull/113)

   The visualization aspect of the project is still in progress, once this pull request gets reviewed. I'll add more enhancements which are listed in the issue.

## Next Phase (post-gsoc)

- Since the weight object is being refactored to remove the legacy part and adopt new features from newly available libraries like `pandas` and `xarray`. I'll need to reflect these changes to the interface once they are incorporated into the `libpysal`.
- Additionally, the interface once merged will be in the alpha-testing phase and I'm expecting new bugs to pop-in which we were not able to test. Therefore I'll have to be available to provide the bug fixes for a few initial months of merging the interface.
- However optimized the weights builder can be, there will be still a chance that the program will run out of memory as the raster size increases. One ambitious idea when working on the interface was related to lazily building the weights object. I did some early explorational prototyping for this part ([[WIP] : Lazy weights object for raster interface](https://github.com/MgeeeeK/libpysal/pull/7/files)) but it'll require a massive change in the structure of the weights object probably a new class only supporting lazy operations. Once it is successfully implemented all the conversion and computation will be lazy which will allow users to use larger than memory rasters, albeit the computations will be slow.
- Even though `xarray` provides great support for `Dask`, the project has not yet taken advantage of or support `dask` structures. It'll be a nice functionality to add to the interface in the future.

## Huge thanks to PySAL Community

As a computer science undergrad this project was a breath of fresh air for me since I was relatively new to the PySAL library and the field of geospatial data science. I gained lots of experience working on this project especially working on somethings I wasn't completely familiar with.

I like to thank my mentors Stefanie, Dani, Levi for taking the time to review the prs, clearing my doubts, and providing me with valuable feedback which helped me along the way of building this project. I also appreciate the work of other community members working on this cool library.

I'll meet you in the new season of surviving 2020.

Mragank Shekhar

