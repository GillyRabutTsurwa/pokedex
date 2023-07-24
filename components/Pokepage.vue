<script lang="ts" setup>
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
const { palette, getColours } = useColours();


const img: Ref<HTMLImageElement | null> = ref(null);
const fetchImageColours = () => getColours(img.value);

const bg = computed(() => {
  return {
    backgroundColor: palette.secondary
  }
});
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
