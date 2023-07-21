<script lang="ts" setup>
const props = defineProps({
  pokémon: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <li>
    <p>{{ props.pokémon.name }}</p>
    <img :src="props.pokémon.img" :alt="props.pokémon.name">
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
