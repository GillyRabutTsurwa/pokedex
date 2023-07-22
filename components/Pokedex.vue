<script lang="ts" setup>
import { usePokéStore } from "../store/pokemon";
import type { Ref } from 'vue'
import { ref, reactive, computed } from "vue";

//TESTING
import ColorThief from "colorthief";

interface Palette {
  primary: string;
  secondary: string;
}

const palette: Palette = reactive({
  primary: "",
  secondary: "",
});
// =============


const store = usePokéStore();
//@ts-ignore
await store.fetchPokémon();


const tableau = ref([]);
const tableau2 = ref([]);
const testo = (payload, payload2) => {
  // console.log(payload);
  // console.log(payload2);
  // console.log(payload.currentTarget);

  //TESTING
  const getColours: () => void = (): void => {
    //@ts-ignore
    const colorThief = new ColorThief();

    if (payload.currentTarget?.complete) colorThief.getColor(payload.currentTarget);
    // console.log(colorThief.getPalette(payload.currentTarget));
    const colourPalette = colorThief.getPalette(payload.currentTarget);
    const red = colourPalette[0][0];
    const green = colourPalette[0][1];
    const blue = colourPalette[0][2];
    const rouge = colourPalette[1][0];
    const vert = colourPalette[1][1];
    const bleu = colourPalette[1][2];
    // ==========================
    palette.primary = `rgb(${red},${green},${blue})`;
    palette.secondary = `rgb(${rouge},${vert},${bleu})`;

    console.log(`rgb(${red},${green},${blue})`);
    // @ts-ignore
    tableau.value.push(`rgb(${red},${green},${blue})`);
    // @ts-ignore
    tableau2.value.push(`rgb(${rouge},${vert},${bleu})`);
    console.log(tableau.value);
  }
  getColours();
}
</script>

<template>
  <div>
    <h4>Pokédex</h4>
    <span>{{ palette.primary }}</span>
    <ul ref="pokedex">
      <Pokemon @test="testo" v-for="currentPokémon in store.pokémon" :pokémon="currentPokémon"
        :bgColour="tableau[currentPokémon.id]" :bgColour2="tableau2[currentPokémon.id]" :key="currentPokémon.id" />
    </ul>
  </div>
</template>

<style lang="scss" scoped>
h4 {
  margin: 8rem 0;
  text-align: center;
  font-family: "Lexend Deca", sans-serif;
  font-size: 10rem;
  text-transform: uppercase;
  font-weight: normal;
}
</style>