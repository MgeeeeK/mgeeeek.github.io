# Coding Period: First Phase Part 2


_Phase 1 of the coding period is about to get over and 2 weeks have already passed since I gave an update on my GSoC project. As per my last [blog](https://mgeeeek.github.io/posts/2020/06/coding-period-first-phase-part-1/), I successfully implemented the prototype transformation methods of the base interface, let’s look at the developments happened after the first 2 weeks._

## Progress on the Project

The main goal of the first phase was to implement and finalize the base raster interface, in other words, I had to incorporate all methods which can be utilized to make the transformations from `xarray.DataArray` to both weight objects of PySAL (explained in my previous blog) and convert data back to `xarray.DataArray`. In the first 2 weeks of the coding period, we discussed the potential API of these methods and I worked on the prototype functions (this pr shows the initial prototype).

The proposed timeline in the project proposal for last 2 weeks is listed below:

- [x] Design the Uniform API which will aid in building the interface and in integrating well across PySAL library.
- [x] Finalize the logic of the transformational methods based on eager evaluation. 
- [ ] Add additional functionality to convert raster data straight to `Geo/Pandas Dataframe`
- [x] Implement other required raster utility methods.
- [x] Create utility functions that will be required for reshaping and aligning the raster data with spatial weights matrix.
- [x] Create a functionality for processing the outputs from PySAL to write them out to `rasterio` object. (_`rasterio` was replaced by `xarray`, read last blog for the reason_)

Most of the tasks were achieved during this period except 3rd one which is not in our plan currently but I will look into it in the later stage.

## New API Design/Enhancements

After several discussions with my mentors it was decided that the better way to present the transformational methods to the user is by using class methods through the contiguity classes (`Rook` and `Queen` for now). This required some modification in the existing weights object, current approach adds one additional attribute to store the coordinates of non-missing values (this will be further discussed with the rest of the community during this weeks group call). After finalizing the base interface by adding necessary changes targeting the community feedback I'll add the tests.

## Example Notebook for Raster Interface

This notebook will provide an overview of ways we can use newly added raster interface to operate on raster data.

[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/MgeeeeK/GSoC2020/master?filepath=gsoc_phase_1_raster_interface.ipynb)

```python
%matplotlib inline

from libpysal.weights import Rook, Queen
import numpy as np
import xarray as xr
from esda import Moran_Local
```

    /data/GSoC/libpysal/libpysal/weights/util.py:20: UserWarning: geopandas not available. Some functionality will be disabled.
      warn('geopandas not available. Some functionality will be disabled.')


Currently each method inside this interface only accepts `xarray.DataArray` as input, let's read in some data using `open_rasterio()` method:


```python
# Multiband band raster data with no missing values
da1 = xr.open_rasterio('HARV_RGB_Ortho.tif')
# Slicing the dataarray
da1 = da1[:, 600:700, 700:800] 
```


```python
# Ploting only first band of the da
da1[:1].plot()
```

{{< image src="/images/Untitled_4_1.png" alt="png" position="center">}}


After accessing the raster data we will create weights object using a method called `from_xarray` from Rook class 


```python
# Let's check the method first
help(Rook.from_xarray)
```

    Help on method from_xarray in module libpysal.weights.contiguity:
    
    from_xarray(da, band=None, sparse=False, **kwargs) method of builtins.type instance
        Construct a weights object from a xarray.DataArray object 
        
        Parameters
        ----------
        da         : xarray.DataArray
                    raster file accessed using xarray.open_rasterio method
        band       : int
                    select band for raster with multiple bands
        sparse     : boolean
                    type of weight object. Default is dense. For sparse, sparse = True
        **kwargs   : keyword arguments
                    optional arguments for :class:`pysal.weights.W`
        See Also
        --------
        :class:`libpysal.weights.weights.W`
    


`from_xarray` method will first check if data can be converted and if the bands is passed or not, if not passed then it'll select first band as default


```python
# Creating weight of object from raster
w_rook = Rook.from_xarray(da1)
```

    /data/GSoC/libpysal/libpysal/weights/raster.py:37: UserWarning: Multiple bands detected in the DataArray. Using default band 1 for further computation
      warn('Multiple bands detected in the DataArray. Using default band 1 for further computation')


This created weight object contains one additional attribute `coords` which stores the coordinates of non missing values in the form of `MultiIndex` of `pandas.Series`


```python
# Quick view at the data stored in coords
w_rook.coords[:5]
```




    MultiIndex([(1, 4713385.375, 732173.625),
                (1, 4713385.375, 732173.875),
                (1, 4713385.375, 732174.125),
                (1, 4713385.375, 732174.375),
                (1, 4713385.375, 732174.625)],
               names=['band', 'y', 'x'])



After converting `DataArray` to `pandas,Series`, we can access non missing values of raster data (_this is still under process of review_)


```python
# Loading the raster data for further calculation
data1 = da1.to_series()[w_rook.coords]
data1[:5]
```




    band  y            x         
    1     4713385.375  732173.625    132.0
                       732173.875     94.0
                       732174.125     91.0
                       732174.375    110.0
                       732174.625    106.0
    dtype: float64




```python
# Quickly computing and loading a LISA
np.random.seed(12345)
lisa = Moran_Local(data1,w_rook)
```

We'll now try to convert computed data back to `xarray.DataArray`, we can use `to_xarray` method belonging to weight method for the transformation.


```python
# Let's check the method first
help(w_rook.to_xarray)
```

    Help on method to_xarray in module libpysal.weights.weights:
    
    to_xarray(data, indices=None, attrs=None) method of libpysal.weights.weights.W instance
        converts the aligned data to a `xarray.DataArray` object
        
        Arguments
        ---------
        data    :   array
                    data values stored in 1d array
        indices :   Dictionary/xarray.core.coordinates.DataArrayCoordinates
                    coordinates from original DataArray
        attrs   :   Dictionary
                    attributes from original DataArray 
        Returns
        -------
        
        da : xarray.DataArray
            instance of xarray.DataArray
    



```python
# Converting obtained data back to DataArray
moran_da1 = w_rook.to_xarray(lisa.p_sim, da1.coords, da1.attrs)
```


```python
# Plotting the converted DataArray
moran_da1.plot()
```

{{< image src="/images/Untitled_17_1.png" alt="png" position="center">}}


We'll now perform same operations on different raster data


```python
# single band raster data with missing values
da2 = xr.open_rasterio('nasadem_sd.tif')
# slicing the dataarray
da2 = da2[:, :100, 300:400]
```


```python
# ploting dataarray after removing missing values
da2.where(da2.data>0).plot()
```

{{< image src="/images/Untitled_20_1.png" alt="png" position="center">}}


This time we will create weights object using `Queen` class 


```python
# Creating weight of object from raster
w_queen = Queen.from_xarray(da2)
```


```python
# Loading the raster data for further calculation
data2 = da2.to_series()[w_queen.coords]
data2[:5]
```




    band  y       x          
    1     33.505  -117.509444    256
                  -117.509167    261
                  -117.508889    263
                  -117.508611    263
                  -117.508333    264
    dtype: int16




```python
# Quickly computing and loading a LISA
np.random.seed(12345)
lisa = Moran_Local(data2,w_queen)
```


```python
# Let's check the method first
moran_da2 = w_queen.to_xarray(lisa.p_sim, da2.coords, da2.attrs)
```


```python
# Plotting the converted DataArray
moran_da2.where(moran_da2.data>0).plot()
```

{{< image src="/images/Untitled_26_1.png" alt="png" position="center">}}


## Experience

Without a doubt, this summer has been very interesting and worthwhile with tons of knowledge gained and new things explored related to the project. After every interaction with my mentors, my appreciation for PySAL grow even more, I'm able to understand the design decisions went behind the creation of APIs, different methods and overall structure of each module in PySAL library. 

## What’s next?

There are some API fixes which my mentors suggested I'll work on those side by side I'll also work on the feedback and suggestions which will be given by the community in the upcoming group call and will try to finalize the interface before next week, after that I'll add remaining tests and docstring examples.

Wait for my next blog which will shed some light on the optimization part along with the integration of the interface with other parts of the library... Till then adios amigos 👋.

