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
  abilities: Array<{ name: string }>;
  moves: Array<{ move: { name: string; url: string } }>;
  sprites: PokéStripe;
  stats: Array<PokéStat>;
  types: Array<{ type: { name: string } }>;
}

// props interface
interface Props {
  pokémon: Pokémon
}

const props = defineProps<Props>();
console.log(props.pokémon);
</script>

<template>
  <div>
    <h4>{{ props.pokémon.name }}</h4>
  </div>
</template>

<style scoped></style>
