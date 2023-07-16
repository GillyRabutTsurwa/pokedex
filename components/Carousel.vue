<script setup lang="ts">
import type { Ref } from 'vue'
import { ref, onMounted } from "vue";
import { usePokéStore } from "../store/pokemon";

const store = usePokéStore();
const photoIndex: Ref<number> = ref(0);

store.fetchPokémon();

onMounted(() => {
  setInterval(() => {
    photoIndex.value = Math.floor(Math.random() * (store.pokémon.length - 1));
    if (photoIndex.value >= store.pokémon.length) photoIndex.value = 0;
  }, 15000);
});
</script>
        
<template>
  <figure class="container">
    <img v-for="(currentPokemon, index) in store.pokémon" :key="currentPokemon.id"
      :src="currentPokemon.sprites.other['official-artwork'].front_default" :class="{ opaque: index === photoIndex }" />
  </figure>
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100vh;
  /* background-color: forestgreen; */
}

img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50rem;
  height: 50rem;
  object-fit: cover;
  /* makes it look nicer */
  opacity: 0;
  transition: opacity 1s ease-in-out;

}

.opaque {
  opacity: 1;
}
</style>
