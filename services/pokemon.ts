import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mpf7abfd2054e7e3b6a3.free.beeceptor.com",
  }),
  tagTypes: [],
  endpoints: (build) => ({
    getPokemonByName: build.query({
      query: (name: string) => `data`,
    }),
    updatePokemon: build.mutation({
      query: ({ name, ...patch }) => ({
        url: `post/${name}`,
        method: "PATCH",
        body: patch,
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetPokemonByNameQuery, useUpdatePokemonMutation } =
  pokemonApi;
