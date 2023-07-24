<script lang="ts" setup>
import { usePokéStore } from "../store/pokemon";

const { tableau, tableau2, getColours } = useColours();
const store = usePokéStore();
await store.fetchPokémon();

const testo = (payload: Event, payload2: number) => {
  getColours(payload);
}
</script>

<template>
  <div>
    <h4>Pokédex</h4>
    <ul ref="pokedex">
      <Pokemon @test="testo" v-for="currentPokémon in store.pokémon" :pokémon="currentPokémon"
        :bgColour="tableau[currentPokémon.id]" :bgColour2="tableau2[currentPokémon.id]" :key="currentPokémon.id" />
    </ul>
  </div>
</template>

<style lang="scss" scoped>
h4 {
  margin: 8rem 0;
  text-align: center;
  font-family: "Lexend Deca", sans-serif;
  font-size: 10rem;
  text-transform: uppercase;
  font-weight: normal;
}
</style>