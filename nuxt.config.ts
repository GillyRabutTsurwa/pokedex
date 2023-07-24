// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ["@pinia/nuxt", "@nuxtjs/google-fonts"],
    /**
     * NOTE: this is new to Nuxt
     * le dossier pages est facultatif (optional),
     * vue-router sera pas compris à moins que je mette la valeur `true` dans ce fichier, comme dessous
     */
    pages: true,
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@use "@/assets/sass/_base.scss" as *; @use "@/assets/sass/_variables.scss" as *;`,
                },
            },
        },
    },
    css: ["@/assets/sass/main.scss"],
    //TESTING
    ssr: false,
    googleFonts: {
        display: "swap",
        preconnect: true,
        families: {
            Abel: true,
            "League+Spartan": {
                wght: [200, 300, 400, 600, 700],
            },
            "Lexend+Deca": {
                wght: [100, 300, 400, 500],
            },
        },
    },
});
