<script setup lang="ts">
import { usePokéStore } from '../../store/pokemon';
const store = usePokéStore();
await store.fetchPokémon();
</script>

<template>
    <div>
        <h4>Pokémon Page</h4>
        <ul>
            <li v-for="{ name } in store.pokémon" :key="{ id }">
                {{ name }}
            </li>
        </ul>
    </div>
</template>


<style scoped></style>