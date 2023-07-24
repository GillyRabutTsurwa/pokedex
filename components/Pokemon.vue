<script lang="ts" setup>
const emit = defineEmits(["test"]);
const props = defineProps({
  pokémon: {
    type: Object,
    required: true
  },
  bgColour: {
    type: String,
    required: false
  },
  bgColour2: {
    type: String,
    required: false
  }
});

const getColours: (event: Event, id: number) => void = (): void => {
  emit("test", event, props.pokémon.id);
}
</script>

<template>
  <NuxtLink :to="`/pokemon/${props.pokémon.name}`">
    <li :style="{ backgroundColor: props.bgColour }">
      <p :style="{ color: props.bgColour2 }">{{ props.pokémon.name }}</p>
      <img @load="getColours($event, props.pokémon.id)" :src="props.pokémon.img" :alt="props.pokémon.name" loading="lazy"
        crossorigin="anonymous">
    </li>
  </NuxtLink>
</template>

<style lang="scss" scoped>
a {

  &,
  &:link,
  &:visited {
    text-decoration: none;
  }

  &:hover,
  &:active {
    li {
      transform: translateY(-5%);
    }
  }
}

li {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75%;
  padding: 0 3rem;
  margin: 8rem auto;
  box-shadow: 5px 5px 15px -1px #979797;
  transition: all 0.25s ease-in;


  p {
    font-size: 15rem;
    font-family: $font;
    text-transform: capitalize;
  }
}
</style>
