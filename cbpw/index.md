# Community bonding period wrap-up


_Today marks the end of the community bonding period and the beginning of the coding period of GSoC. In this blog, I'll share my experience with the PySAL community during the community bonding period._

The community bonding period is the starting phase in the GSoC timeline which lasts for almost a month. This period is specially designed for students to get introduced to the community and to understand and learn more about the project before the coding period starts. Additionally, students are also expected to become familiar with documentations, open-source practices, and procedures.

Most of my time during the community bonding period was devoted to studying the `libpysal`'s codebase thoroughly to comprehend its structure, internal functions and testing procedures, I also worked on the examples and read documentation of `rasterio` and `xarray` to understand these libraries in depth. Because of my semester getting extended by one month I was not able to dedicate more time to the project as planned earlier in my proposal, I tried to wrap up my coursework, assignments and end-sem exam preparation so that I can completely focus on the project in the coming week.

### Meetings and Progress

In total 3 projects were selected by the PySAL community for this summer. To keep the project-related meetings and interaction more efficient and productive, it was decided by the mentors to coordinate every other week with all gsoc project members and separately in the off-weeks with individual project members. During the community bonding period 3 meetings/calls occurred, one call every Friday.

- The first call was an introductory meeting involving all students and mentors from each project. This meeting was more about getting to know each other, everyone introduced themselves and also discussed about current state of PySAL and how community use it in their research work. Additionally, we talked about git conventions and setting up the development environment using anaconda. The first meeting was really fruitful and everyone was very friendly and welcoming.

Before the next meeting, my project mentors Dani and Stefanie provided me with some additional resources related to the project. Since I'm very new in the field of geospatial data science and GIS, I’ve been heavily involved with reading a lot of documentation and learning new things which will help me to get familiar with different statistical methods in PySAL and how they use different data structure as input.

- The project-specific meeting which happened one week after the first meeting only involved the mentors and student working on that project, mine was related to my project which is Raster awareness in PySAL. I updated the mentors with my proposed approach provided in the proposal, discussed the roadmap for integrating the interface to the library and talked about possible changes in the proposal, it was also cleared by the mentors that the interface with minimal changes in the core computational structure takes priority over making use of Dask since this might require a lot of research and time. The rest of our discussion was related to possible features and functionality to be included after the completion of phase 1. We also discussed about project progress tracking/management and later decided to use issue and PRs with project tag as project tracking diary.

Since I'd my exams during this week, I was not able to contribute/submit any patch related to the project. Instead, I worked and explored an efficient way to transform `xarray.dataArray` object to PySAL weight object as discussed during the last meeting. I noticed that while using the `Lat2W` function I was able to transform correctly, but building a weight object using `Lat2W` with large values of rows and columns resulted in memory overflow as it uses lists for storing the neighbors, weights, and ids in the dictionary. I'm planning to explore this in-depth next week and push a patch related to this.

- In the last meeting of the community bonding period, mentors cleared some doubts which students had and discussed possible ways of project tracking and management. I also had a call with my project mentors to discuss deliverables I'm supposed to work on during the first week of the coding period.

With my exams finishing up in the mid of next week, I am looking forward to having a really productive and wonderful summer ahead, learning and contributing exciting stuff to PySAL. Till then, adios !!

