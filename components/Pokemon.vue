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
  <li :style="{ backgroundColor: props.bgColour }">
    <p :style="{ color: props.bgColour2 }">{{ props.pokémon.name }}</p>
    <img @load="getColours($event, props.pokémon.id)" :src="props.pokémon.img" :alt="props.pokémon.name" loading="lazy"
      crossorigin="anonymous">
  </li>
</template>

<style lang="scss" scoped>
li {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75%;
  padding: 0 3rem;
  margin: 8rem auto;
  box-shadow: 5px 5px 15px -1px #979797;

  p {
    font-size: 15rem;
    font-family: "Lexend Deca", sans-serif;
    text-transform: capitalize;
  }
}
</style>
