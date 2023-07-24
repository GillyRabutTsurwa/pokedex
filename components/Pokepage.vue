<script lang="ts" setup>
import ColorThief from "colorthief";

// TESTING: copied from store file
type PokéStripe = {
  front_default: string;
  front_shiny: string;
  other: {
    "official-artwork": {
      front_default: string;
      front_shiny: string;
    };
  };
};

type PokéStat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
  };
};
interface Pokémon {
  name: string;
  id: number;
  img: string;
  types: Array<{ type: { name: string } }>;
  abilities: Array<{ name: string }>;
  stats: Array<PokéStat>;
}

// props interface
interface Props {
  pokémon: Pokémon
}

const props = defineProps<Props>();

interface Palette {
  primary: string;
  secondary: string;
}

const palette: Palette = reactive({
  primary: "",
  secondary: "",
});

const getColours: () => void = (): void => {
  const colorThief = new ColorThief();

  if (img.value?.complete) colorThief.getColor(img.value);
  const colourPalette = colorThief.getPalette(img.value);
  const red = colourPalette[0][0];
  const green = colourPalette[0][1];
  const blue = colourPalette[0][2];
  const rouge = colourPalette[1][0];
  const vert = colourPalette[1][1];
  const bleu = colourPalette[1][2];

  palette.primary = `rgb(${red},${green},${blue})`;
  palette.secondary = `rgb(${rouge},${vert},${bleu})`;
};

const img: Ref<HTMLImageElement | null> = ref(null);
const fetchImageColours = () => {
  getColours();
}
const bg = computed(() => {
  return {
    backgroundColor: palette.secondary
  }
});
console.log(palette);
</script>

<template>
  <div class="container" :style="bg">
    <h4>{{ props.pokémon.name }}</h4>
    <p>{{ props.pokémon.types }}</p>
    <img @load="fetchImageColours" :src="props.pokémon.img" ref="img" crossorigin="anonymous">
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: inherit;
}
</style>
