<script lang="ts" setup>
const route = useRoute();
const pokémonName = route.params.id;
console.log(pokémonName);
</script>
<template>
    <div>
        <h4>{{ pokémonName }}</h4>
    </div>
</template>


<style lang="scss" scoped></style>