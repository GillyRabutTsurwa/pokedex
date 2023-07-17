import { defineStore } from "pinia";

interface PokémonList {
    count: number;
    next: string;
    previous?: any;
    results: {
        name: string;
        url: string;
    }[];
}

interface PokémonState {
    pokémon: object[];
    // randomPokémon: object
}

export const usePokéStore = defineStore("pokémon", {
    state: (): PokémonState => {
        return {
            pokémon: [],
            // randomPokémon: {}
        };
    },
    // getters: {
    //     randomPokémon(state) {
    //     },
    // },
    actions: {
        async fetchPokémon() {
            const limit = 150;
            const URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`;
            const response: Response = await fetch(URL);
            const data: PokémonList = await response.json();
            const pokémonNames = data.results;

            const pokémonPromises = pokémonNames.map(async (currentPokémon: any) => {
                const URL = `https://pokeapi.co/api/v2/pokemon/${currentPokémon.name}`;
                const response: Response = await fetch(URL);
                const data = await response.json();
                return data;
            });

            const pokémon: object[] = await Promise.all(pokémonPromises);
            this.pokémon = pokémon;
        },
        randomisePokémon() {
            return this.pokémon[Math.floor(Math.random() * this.pokémon.length)];
        },
    },
});
