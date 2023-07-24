<script setup lang="ts">
import { usePokéStore } from "../store/pokemon";
import ColorThief from "colorthief";

const store = usePokéStore();
await store.fetchPokémon();

interface Palette {
  primary: string;
  secondary: string;
}

const palette: Palette = reactive({
  primary: "",
  secondary: "",
});
const img: Ref<HTMLImageElement | null> = ref(null);

const getColours: () => void = (): void => {
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

  palette.primary = `rgb(${red},${green},${blue})`;
  palette.secondary = `rgb(${rouge},${vert},${bleu})`;
  console.log(palette.primary);
}

const bg: ComputedRef<{ backgroundImage: string }> = computed(() => {
  return {
    backgroundImage: `linear-gradient(to right, ${palette.primary} 0%, ${palette.primary} 70%, ${palette.secondary} 70%, ${palette.secondary} 100%)`
  }
})

onMounted(() => {
  store.randomisePokémon();
  setInterval(() => {
    store.randomisePokémon();
  }, 10000)
});
</script>
        
<template>
  <div class="container" :style="bg">
    <h2 :style="{ color: palette.secondary }">{{ store.randomPokémon.name }}</h2>
    <figure class="pokemon-img">
      <img @load="getColours" :src="store.randomPokémon.img" crossorigin="anonymous" ref="img" />
    </figure>
  </div>
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
  top: 25%;
  left: 5%;
  font-size: 18rem;
  text-transform: capitalize;
  font-family: $font;
}
</style>
