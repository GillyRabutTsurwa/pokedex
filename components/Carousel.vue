<script setup lang="ts">
import type { Ref } from 'vue'
import { ref, reactive, computed, onMounted } from "vue";
import { usePokéStore } from "../store/pokemon";
import ColorThief from "colorthief";

const store = usePokéStore();
const pokémon = ref({});
const img: Ref<HTMLImageElement | null> = ref(null);
const palette = reactive({
  primary: "",
  secondary: "",
});

//@ts-ignore
await store.fetchPokémon();
const getColours = () => {
  //@ts-ignore
  const colorThief = new ColorThief();

  if (img.value?.complete) colorThief.getColor(img.value);
  console.log(colorThief.getPalette(img.value));
  const colourPalette = colorThief.getPalette(img.value);
  const red = colourPalette[0][0];
  const green = colourPalette[0][1];
  const blue = colourPalette[0][2];
  const rouge = colourPalette[1][0];
  const vert = colourPalette[1][1];
  const bleu = colourPalette[1][2];
  // ==========================
  palette.primary = `rgb(${red},${green},${blue})`;
  palette.secondary = `rgb(${rouge},${vert},${bleu})`;
  console.log(palette.primary);

}

onMounted(() => {
  store.randomisePokémon();
  pokémon.value = store.randomisePokémon();
  console.log(pokémon.value);
  setInterval(() => {
    pokémon.value = store.randomisePokémon();
    console.log("Fetching random Pokemon");
    console.log(pokémon.value);
  }, 3000)
});


</script>
        
<template>
  <div class="container" :style="{
    backgroundImage: `linear-gradient(
            to right,
            ${palette.primary} 0%,
                                                      ${palette.primary} 70%,
                                                      ${palette.secondary} 70%,
                                                      ${palette.secondary} 100%
        )` }">
    <h2 :style="{ color: palette.secondary }">{{ pokémon.name }}</h2>

    <figure class="pokemon-img">
      <img @load="getColours" :src="pokémon.sprites?.other['official-artwork'].front_default" crossorigin="anonymous"
        ref="img" />
    </figure>
  </div>
  <!-- <span>{{ x.sprites.other['official-artwork'].front_default }}</span> -->
</template>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100vh;
  /* background-color: forestgreen; */
}

.pokemon-img {
  position: absolute;
  top: 70%;
  left: 70%;
  transform: translate(-50%, -50%);
  width: 50rem;
  height: 50rem;
  object-fit: cover;
  /* makes it look nicer */
  // opacity: 0;
  transition: opacity 1s ease-in-out;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

}

.opaque {
  opacity: 1;
}

h2 {
  position: absolute;
  font-family: "Lexend Deca", sans-serif;
  top: 25%;
  left: 10%;
  font-size: 15rem;
}
</style>
