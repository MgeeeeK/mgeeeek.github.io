# Coding Period: Second Phase Part 1


_Phase 1 of the coding period has already completed and we've had almost reached the midpoint of the coding period. This blog will provide a short update of the work done in the last couple of weeks._

## API Status

At the end of Phase 1, there were some bug fixes and API changes that my mentors suggested, these were minor changes that were quickly included in the project in the following week. After adding these changes the base raster interface was ready to get reviewed by the PySAL community and one of the main discussion topic was related to the attribute situation that the raster project was facing. After a detailed meeting with community members regarding the `W` object... which was really interesting as the conversation deep dived into the history and the API decisions went behind the creation of `W` object which is very core to the PySAL library as most methods are built around it, you can checkout these [meeting notes](https://hackmd.io/Fozkz1IRQlK6GYVKI8mF9Q?both) anyway... one of the major change that was proposed is to shift towards `WSP` object (go through my last blogs to learn more about these 2 objects) additionally `id_order` attribute will be replaced by `index` which will contain instance of `pandas.Index` aligned with the ids of the weight object.
This required some changes in my existing implementation, since the API was finalized I created a pull request which can be accessed here -

- [[WIP] : Base Raster Interface](https://github.com/pysal/libpysal/pull/318)

I also started working on unit tests and documentation to go along with the interface. When I look back at my proposal I feel like I underestimated the first phase, this which was a mistake from my side as I never thought how much time it goes behind the designing the API.

## Optimization Phase

In the proposed timeline, after successfully delivering the base raster interface with complete and finalized API I planned to work on the optimization phase. Since the API was almost finished I started to think about possible solutions to improve the _performance_ and _scalability_ of the current methods. After my project related meeting with my mentors, we finalized several optimization related ideas that can be incorporated in the project. You can look into this issue which contains discussion related to the optimization phase -

- [Idea collection/discussion for Raster awareness project](https://github.com/pysal/libpysal/issues/293)

One of the more ambitious ideas was to create a _lazy graph mixin_, since a raster can be expressed as a regular lattice, we can build the weight object _on-the-fly_ with only some information about raster in the memory. I explored this idea and pushed a _prototype_ object which calculates neighbors of a given id lazily, it is still far from the real solution but it will help me to think more about this concept as it will significantly help the interface to work even on low memory.

- [[WIP] : Lazy weights object for raster interface](https://github.com/MgeeeeK/libpysal/pull/7)

Right now the top priority is to build the weights object with only _non-missing values_ as the current approach builds a regular lattice and then removes the missing values using boolean masking which is computationally quite expensive. Along with this, I've to think about how I can utilize almighty `numba` to further improve the performance of the builders, I've experimented with this to improve the existing solution you can check the implementation here -

- [[WIP]: Raster optimization phase](https://github.com/MgeeeeK/libpysal/pull/6)

Once the base interface is merged I'll work on these solutions and explore more ways to optimize the interface.

## What's next?

Currently, my main focus is to complete the base raster interface by adding tests and documentation. After that, I'll look into ongoing optimization of the current methods and later explore ideas related to integrating the interface with other library components.

Goodbye 👋 fellow human, will meet you in the next blog.

