<script setup lang="ts">
import type { Ref } from 'vue'
import { ref, computed, onMounted } from "vue";
import { usePokéStore } from "../store/pokemon";
import ColorThief from "colorthief";

const store = usePokéStore();

const x = ref({});


//@ts-ignore
await store.fetchPokémon();

onMounted(() => {
  store.randomisePokémon();
  x.value = store.randomisePokémon();
  console.log(x.value);
  setInterval(() => {
    x.value = store.randomisePokémon();
    console.log("Fetching random Pokemon");
    console.log(x.value);
  }, 3000)
});


</script>
        
<template>
  <figure v-if="store.pokémon.length !== 0" class="container" ref="figure">
    <img :src="x.sprites?.other['official-artwork'].front_default" crossorigin="anonymous" ref="img" />
  </figure>
  <!-- <span>{{ x.sprites.other['official-artwork'].front_default }}</span> -->
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
  // opacity: 0;
  transition: opacity 1s ease-in-out;

}

.opaque {
  opacity: 1;
}
</style>
