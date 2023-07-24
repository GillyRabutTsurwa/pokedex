<script setup lang="ts">
import { usePokéStore } from "../store/pokemon";

const { palette, getColours } = useColours();
const store = usePokéStore();
await store.fetchPokémon();

const img: Ref<HTMLImageElement | null> = ref(null);

const getColoursx: () => void = (): void => {
  getColours(img.value);
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
      <img @load="getColoursx" :src="store.randomPokémon.img" crossorigin="anonymous" ref="img" />
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
