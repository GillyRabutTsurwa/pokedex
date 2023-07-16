// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ["@pinia/nuxt"],
    /**
     * NOTE: this is new to Nuxt
     * le dossier pages est facultatif (optional),
     * vue-router sera pas compris à moins que je mette la valeur `true` dans ce fichier, comme dessous
     */
    pages: true,
    css: ["@/assets/sass/main.scss"],
});
