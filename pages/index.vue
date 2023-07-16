<script setup lang="ts">
import { ref, reactive } from "vue";

import { usePokéStore } from '../store/pokemon';
const store = usePokéStore();

store.fetchPokémon();

console.log(store.pokémon);

const state = reactive({
    count: 0
});



</script>
        
<template>
    <div class="container">
        <h5>Pokedex</h5>
        <button @click="state.count++">Increment</button>
        <span>{{ state.count }}</span>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    height: 100vh;
    background-color: forestgreen;
}
</style>