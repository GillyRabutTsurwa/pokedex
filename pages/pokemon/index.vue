<script setup lang="ts">
import { usePokéStore } from '../../store/pokemon';
const store = usePokéStore();
//@ts-ignore
await store.fetchPokémon();
</script>

<template>
    <div>
        <h4>Pokémon Page</h4>
        <ul>
            <li v-for="{ name, id } in store.pokémon" :key="id">
                {{ name }} {{ id }}
            </li>
        </ul>
    </div>
</template>


<style scoped></style>