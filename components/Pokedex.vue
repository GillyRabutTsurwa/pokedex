<script lang="ts" setup>
import { usePokéStore } from "../store/pokemon";
const store = usePokéStore();
//@ts-ignore
await store.fetchPokémon();
</script>

<template>
  <div>
    <h4>Pokémon Page</h4>
    <ul>
      <Pokemon v-for="currentPokémon in store.pokémon" :pokémon="currentPokémon" :key="currentPokémon.id" />
    </ul>
  </div>
</template>

<style scoped></style>