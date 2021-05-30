# Coding Period: First Phase Part 1


_Community Bonding period ended on 31st May, I covered my experience with PySAL community during the CB period in my last blog. The coding period has started at the beginning of this month and we’ve already reached midway of the first phase. Through this blog, I’ll share what all I’ve been working on during these couple of weeks._

## Overview of 2 Spatial Weight Objects 

During the community bonding period my focus was to grow my understanding of `libpysal`'s structure, codebase, and API design paradigms. Along with this, I was looking deeply at the 2 types of spatial class objects used in PySAL namely `W` & `WSP` objects which are used to construct spatial weight matrices, specifically I was understanding the logic and structure of each object and ways in which both of them are created. Lemme provides a bit overview of each object (this is a fairly basic explanation, please refer to this [video](https://youtu.be/fc1f4MNLzdQ?t=5424) or the main [documentation](https://pysal.org/libpysal/) of `libpysal`).

**Spatial Weights Matrix**: In general, it expresses the relationship of a spatial point with its neighboring points. It can be viewed as an adjacency matrix of a weighted graph where each node is connected to other node and these connections follow a specific spatial-contiguity like rook or queen (there are other contiguities as well but these 2 are intuitive to understand).

**W object**: It's used to construct spatial weight and represent it in the form of 2 dictionaries-
- `neighbors dictionary`, where each key specifies a selected point, and the corresponding value is a list containing neighbors of the selected point.
- `weights dictionary`, similar to the neighbor dictionary but instead of specifying neighbors, the list contains the weight of each connection of the key to the neighbor listed in the neighbor dictionary.

**WSP object**: It is also used to construct spatial weight but unlike `W` object it represents the spatial weights in the form of a sparse matrix where each row shows the relationship of a point with every other point. 

Constructing a `WSP` object requires fewer computation when compared to constructing a `W` object, but it does not contain the same amount of information as a `W` object. PySAL's statistical methods operate on these two objects and until now these two objects are mainly derived from vector data (which can be presented in the form of different structures like data frame, shapefiles). 

## What did I do this week?

Coming back to the coding period, in my project proposal I listed out the following tasks that I'll work on during first 2 weeks. Slight changes have been made in the timeline after having discussion with my mentors during CBPeriod, it was decided that `xarray` will be used for the project instead of `rasterio` because `xarray` provides a proper structure to the raster's metadata which makes it easy for users to manipulate and access the properties of raster file using `xarray.DataArray` object.

> *Week 1 & 2* (1st June - 14th June) :
>* List out initial functionalities to be incorporated in the interface.
>* Implement necessary methods for streamlining the access to raster data using `rasterio` inside PySAL.
>* Add methods to extract extract metadata from rasters.
>* Create an optimized functionality for handling missing values in the raster data used by prototype transformational methods. 
>* Investigate inner working of `georasters` methods, since some of its functionality can be improved and used for this project.
>* Discuss the proposed design of the API of interface and this will be worked upon in the next week.

Unfortunately, I had my exams going on during the first week of the coding period, therefore I was a little unproductive and could not completely focus on the project. During this time I set up my development environment, looked at `georasters` library, and worked on how I can convert `xarray.DataArray` to weight object.

My exams were over by the first week and I was able to devote more time to the project. My main task for this week was to work on prototype transformational methods that are going to be used in transforming the raster file accessed using `xarray` to `W` and `SW` objects. Along with this I also worked on converting results back to `xarray.Dataframe` object.

PRs made during this period:
- [Added rast2(W,SW)](https://github.com/MgeeeeK/libpysal/pull/1) 
- [Added func for creating xr.dataarray](https://github.com/MgeeeeK/libpysal/pull/2)

Since I used the `lat2W` method, I noticed that the `W` object stores the neighbors in the list and for large values of rows and columns (2 arguments of the function) the computation runs out of memory, this problem will exist since the methods use eager evaluation. I plan to create an additional method which computes the dictionary values of `W` object lazily, working with generator objects is tough in this situation since some of the PySAL's methods require all data of `W` object in memory. This requires more time and I will see if it can be modified in a way so that the PySAL library can work with it.

## What's next?

During my recent project call, both mentors reviewed my work and suggested some corrections in the API and the function implementation. In the coming weeks, I have to incorporate the suggested changes and finalize both transformational methods (their APIs and return objects) and also work on the optimization part.

Wait for my next blog which will show the working of my contributed methods... Till then goodbye 👋.

