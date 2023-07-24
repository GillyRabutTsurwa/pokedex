import ColorThief from "colorthief";
import { ref, reactive } from "vue";

interface Palette {
    primary: string;
    secondary: string;
}

export const useColours = () => {
    const palette: Palette = reactive({
        primary: "",
        secondary: "",
    });
    const tableau: Ref<string[]> = ref([]);
    const tableau2: Ref<string[]> = ref([]);
    // const test = () => console.log("composable test");
    const getColours: (image: any) => void = (imageEl): void => {
        const colorThief = new ColorThief();

        if (imageEl.currentTarget?.complete && imageEl.currentTarget.naturalWidth > 0) colorThief.getColor(imageEl.currentTarget);
        // console.log(colorThief.getPalette(payload.currentTarget));
        const colourPalette = colorThief.getPalette(imageEl.currentTarget);
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
        tableau.value.push(`rgb(${red},${green},${blue})`);
        tableau2.value.push(`rgb(${rouge},${vert},${bleu})`);
        console.log(tableau.value);
    };
    return {
        // test: test,
        getColours: getColours,
        palette: palette,
        tableau: tableau,
        tableau2: tableau2,
    };
};
