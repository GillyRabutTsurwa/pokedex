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
}

export const usePokéStore = defineStore("pokémon", {
    state: (): PokémonState => {
        return {
            pokémon: [],
        };
    },
    actions: {
        async fetchPokémon() {
            const limit = 150;
            const URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`;
            const response: Response = await fetch(URL);
            console.log(response);
            const data: PokémonList = await response.json();
            console.log(data);
            const pokémonNames = data.results;

            console.log(pokémonNames);

            const pokémonPromises = pokémonNames.map(async (currentPokémon: any) => {
                const URL = `https://pokeapi.co/api/v2/pokemon/${currentPokémon.name}`;
                const response: Response = await fetch(URL);
                console.log(response);
                const data = await response.json();
                console.log(data);
                return data;
            });

            const pokémon: object[] = await Promise.all(pokémonPromises);
            console.log(pokémon);

            this.pokémon = pokémon;
        },
    },
});
