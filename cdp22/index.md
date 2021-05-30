# Coding Period: Second Phase Part 2


_Phase two of GSoC2020 is over, this blog is little late cos my laptop's HDD died and I was unable to save my Hugo environment. Overall the summer has been really productive and the API design of the interface is finally reached beta period, let's look at the progress._

## Final API of the Interface

After several weeks of coding, design discussions, and code review, phase 1 of my project which consisted of designing API and all the functionality for the base raster interface is completed. In the last couple of weeks, I had to work on refactoring the methods to align them with the future design of the weights object, along with this there were some new test cases that I had to deal with as my earlier approach was focused only on `GDAL raster formats` and `open_rasterio` method which restricted the interface from being used with other datasets like `NetCDF` and therefore I'd to work on refactoring and thinking what will be the best way to introduce this functionality in the interface. 

These new changes were finalized after project meeting with my mentors, they explained that it'll be ideal if the support for other datasets is extended and the methods could be made more generalized. For this, a parameter `dims` was added to the weight builders, this argument will accept a dictionary, if dimensions of the `DataArray` does not match default dimensions which are `['band', 'time', 'lat', 'y', 'lon', 'x']`.

e.g. `dims` dictionary:
```python
# none of the dimension belong to the default dimension list
>>> da.dims                  
('year', 'height', 'width')
# dimension values should be properly aligned with the following keys
>>> dims = {
        "layer": "year",
        "lat": "height",
        "lon": "width"
    }
```

After adding new fixes, I worked on adding documentation and tests which took me a while to get my head around. After a few iterations of code review by my mentors, they notified me that I need to follow the `NumPy` doc convention for adding docstring. And in the last week of phase 2, I was able to finalize most of the work, you can check this pr which itself documents my progress in the second phase.

- [[WIP] : Base Raster Interface](https://github.com/pysal/libpysal/pull/318)

I've provided an example notebook, which will try to cover the functionality offered by the raster interface.

## Example Notebook for Raster awareness API

This notebook will give an overview of newly developed raster interface. We'll cover 
basic usage of the functionality offered by the interface which mainly involves:
1. converting `xarray.DataArray` object to the PySAL's weights object (`libpysal.weights.W`/`WSP`).
2. going back to the `xarray.DataArray` from weights object.

using different datasets:
- with missing values.
- with multiple layers.
- with non conventional dimension names.


```python
%matplotlib inline

from libpysal.weights import Rook, Queen, KNN
from libpysal.weights import raster
import libpysal as lp
import numpy as np
import xarray as xr
import pandas as pd
from esda import Moran_Local
```

### Loading Data

*The interface only accepts `xarray.DataArray`*, this can be easily obtained from raster data
format using `xarray`'s I/O functionality which can read from a variety of data formats some of them are listed below: 
- [GDAL Raster Formats](https://svn.osgeo.org/gdal/tags/gdal_1_2_5/frmts/formats_list.html) via `open_rasterio` method.
- [NetCDF](https://www.unidata.ucar.edu/software/netcdf/) via `open_dataset` method.

In this notebook we'll work with `NetCDF` and `GeoTIFF` data. 

#### Using local `NetCDF` dataset

In this small example we'll build `KNN` distance weight object using a local `NetCDF` dataset with different dimensions names which doesn't belong to the default list of dimensions.

We'll also see how to speed up the reverse journey (from weights object to `DataArray`) by passing prebuilt `coords` and `attrs` to `w2da` method. 


```python
# After loading netCDF dataset we obtained a xarray.Dataset object
ds = xr.open_dataset('ECMWF_ERA-40_subset.nc')
# This Dataset object containes several data variables    
print(ds)                                         
```

    <xarray.Dataset>
    Dimensions:    (latitude: 73, longitude: 144, time: 62)
    Coordinates:
      * longitude  (longitude) float32 0.0 2.5 5.0 7.5 ... 350.0 352.5 355.0 357.5
      * latitude   (latitude) float32 90.0 87.5 85.0 82.5 ... -85.0 -87.5 -90.0
      * time       (time) datetime64[ns] 2002-07-01T12:00:00 ... 2002-07-31T18:00:00
    Data variables:
        tcw        (time, latitude, longitude) float32 ...
        tcwv       (time, latitude, longitude) float32 ...
        lsp        (time, latitude, longitude) float32 ...
        cp         (time, latitude, longitude) float32 ...
        msl        (time, latitude, longitude) float32 ...
        blh        (time, latitude, longitude) float32 ...
        tcc        (time, latitude, longitude) float32 ...
        p10u       (time, latitude, longitude) float32 ...
        p10v       (time, latitude, longitude) float32 ...
        p2t        (time, latitude, longitude) float32 ...
        p2d        (time, latitude, longitude) float32 ...
        e          (time, latitude, longitude) float32 ...
        lcc        (time, latitude, longitude) float32 ...
        mcc        (time, latitude, longitude) float32 ...
        hcc        (time, latitude, longitude) float32 ...
        tco3       (time, latitude, longitude) float32 ...
        tp         (time, latitude, longitude) float32 ...
    Attributes:
        Conventions:  CF-1.0
        history:      2004-09-15 17:04:29 GMT by mars2netcdf-0.92


Out of 17 data variables we'll use `p2t` for our analysis. This will give us our desired `DataArray` object `da`, we will further group `da` by day, taking average over the `time` dimension.


```python
# this will give us the required DataArray with p2t (2 metre temperature) data variable
da = ds["p2t"]  
da = da.groupby('time.day').mean()
print(da.dims)
```

    ('day', 'latitude', 'longitude')


**Weight builders (`from_xarray`, `da2W`, `da2WSP`) can recognise dimensions belonging to this list `[band, time, lat, y, lon, x]`, if any of the dimension in the `DataArray` does not belong to the mentioned list then we need to pass a dictionary (specifying that dimension’s name) to the weight builder. We can see that the none of dimensions of `da` matches with the default dimensions (`[band, time, lat, y, lon, x]`)**

This means we have to create a dictionary mentioning the dimensions and ship it to weight builder, similar to our last example. 


```python
dims = {}
dims["lat"] = "latitude"
dims["lon"] = "longitude"
dims["layer"] = "day"
w_knn = KNN.from_xarray(da, layer=13, dims=dims, k=8)
```


```python
# we can derive the data from DataArray using index attribute
data = da.to_series()[w_knn.index]  
```

We can now speed up `w2da` by passing `coords` from the existing `DataArray` `da` which we used earlier.

Along with `coords` we can also pass `attrs` of the same `DataArray` this will help `w2da` to retain all the properties of original `DataArray`.

Let's compare the `DataArray` returned by `w2da` and original `DataArray`. For this we'll ship the derived data straight to `w2da` without any statistical analysis.


```python
da1 = raster.w2da(data, w_knn, attrs=da.attrs, coords=da[12:13].coords)
# method to compare 2 DataArray, if true then w2da was successfull
xr.DataArray.equals(da[12:13], da1)  
```




    True



#### Using local `GeoTIFF` dataset

Up until now we've only played with `netCDF` datasets but in this example we'll use a `raster.tif` file to see how interface interacts with it. We'll also see how these methods handle missing data. 

Unlike earlier we'll use weight builder methods from `raster.py`, which we can call directly. Just a reminder that `from_xarray` uses methods from `raster.py` and therefore only difference exists in the API. 

To access GDAL Raster Formats xarray offers `open_rasterio` method which uses `rasterio` as backend. It loads metadata, coordinate values from the raster file and assign them to the `DataArray`.  


```python
# Loading raster data with missing values
da = xr.open_rasterio('lux_ppp_2019.tif')
print(da)
```

    <xarray.DataArray (band: 1, y: 880, x: 940)>
    [827200 values with dtype=float32]
    Coordinates:
      * band     (band) int64 1
      * y        (y) float64 50.18 50.18 50.18 50.18 ... 49.45 49.45 49.45 49.45
      * x        (x) float64 5.745 5.746 5.747 5.747 ... 6.525 6.526 6.527 6.527
    Attributes:
        transform:      (0.0008333333297872345, 0.0, 5.744583325, 0.0, -0.0008333...
        crs:            +init=epsg:4326
        res:            (0.0008333333297872345, 0.0008333333295454553)
        is_tiled:       0
        nodatavals:     (-99999.0,)
        scales:         (1.0,)
        offsets:        (0.0,)
        AREA_OR_POINT:  Area



```python
# we can see that the DataArray contains missing values.
da.where(da.values>da.attrs["nodatavals"][0]).plot() 
```




    <matplotlib.collections.QuadMesh at 0x7f27287a3550>




{{< image src="/images/Raster_awareness_API_29_1.png" alt="png" position="center">}}


We'll look at how weight builders handle missing values. Firstly we'll slice the `DataArray` to reduce overall size for easier visualization.

This time we'll create `WSP` object using `da2WSP` method inside `raster.py`. Since our DataArray is single banded and all of its dimensions belong to the default list, we've to only ship the DataArray to the `da2WSP`.


```python
# Slicing the dataarray
da_s = da[:, 330:340, 129:139]
w_queen = raster.da2WSP(da_s)  # default contiguity is queen
w_rook = raster.da2WSP(da_s, "rook")
```

After plotting both contiguities and sliced `DataArray`, we can see that the missing values are ignored by the `da2WSP` method and only indices of non missing values are stored in `index` attribute of `WSP` object. 


```python
f,ax = plt.subplots(1,3,figsize=(4*4,4), subplot_kw=dict(aspect='equal'))
da_s.where(da_s.values>da_s.attrs["nodatavals"][0]).plot(ax=ax[0])
ax[0].set_title("Sliced raster")
plot_spatial_weights(w_rook, da_s, ax=ax[1])
ax[1].set_title("Rook contiguity")
plot_spatial_weights(w_queen, da_s, ax=ax[2])
ax[2].set_title("Queen contiguity")
plt.show()
```


{{< image src="/images/Raster_awareness_API_33_0.png" alt="png" position="center">}}


### Additional resources

1. [Reading and writing files using Xarray](http://xarray.pydata.org/en/stable/io.html)
2. [Xarray Data Structures](http://xarray.pydata.org/en/stable/data-structures.html)


## What's next?

My first deliverable is almost complete (few bugs here and there stills exists and beta testing is still going on). This coding phase is dedicated towards optimizing and integration of raster interface. Regarding optimization, I've succesfully built a faster raster weight builder using `numba` and `COO_matrix`, I'm working on the multicore implementation for the same. After finishing high performant weight builder, I'll look into efficiently increasing the neighbors in the weights object.

Find out what happens next in the episode of GSoC2020... until then bye-bye 👋.
