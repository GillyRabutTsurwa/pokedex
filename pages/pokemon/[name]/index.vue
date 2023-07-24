<script lang="ts" setup>
import { usePokéStore } from "../../../store/pokemon";
const store = usePokéStore();
const route = useRoute();
const pokémonName = route.params.name;

const pokémon = await store.getSinglePokémon(pokémonName);
console.log(pokémon);
</script>
<template>
    <Pokepage :pokémon="pokémon" />
</template>


<style lang="scss" scoped></style>