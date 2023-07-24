import { defineStore } from "pinia";

interface PokéData {
    count: number;
    next: string;
    previous?: any;
    results: {
        name: string;
        url: string;
    }[];
}

type PokéStripe = {
    front_default: string;
    front_shiny: string;
    other: {
        "official-artwork": {
            front_default: string;
            front_shiny: string;
        };
    };
};

type PokéStat = {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
    };
};

//NOTE: data from api that i need
interface Pokémon {
    name: string;
    id: number;
    abilities: Array<{ name: string }>;
    moves: Array<{ move: { name: string; url: string } }>;
    sprites: PokéStripe;
    stats: Array<PokéStat>;
    types: Array<{ type: { name: string } }>;
}

// my state interface
interface PokéState {
    pokémon: {
        name: string;
        id: number;
        img: string;
        types: Array<{ type: { name: string } }>;
        abilities: Array<{ name: string }>;
        stats: Array<PokéStat>;
    }[];
    // pretty goot solution for now
    randomPokémon: {
        name?: string;
        id?: number;
        img?: string;
        types?: Array<{ type: { name: string } }>;
        abilities?: Array<{ name: string }>;
        stats?: Array<PokéStat>;
    };
}

export const usePokéStore = defineStore("pokémon", {
    state: (): PokéState => {
        return {
            pokémon: [],
            randomPokémon: {},
        };
    },
    actions: {
        async fetchPokémon(): Promise<void> {
            const limit = 150;
            const URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`;
            const response: Response = await fetch(URL);
            console.log(response);
            const data: PokéData = await response.json();
            // console.log(data);
            const pokémonNames = data.results;

            const pokémonPromises = pokémonNames.map(async (currentPokémon) => {
                const URL = `https://pokeapi.co/api/v2/pokemon/${currentPokémon.name}`;
                const response: Response = await fetch(URL);
                const data = await response.json();
                // console.log(data);
                return data;
            });

            console.log(pokémonPromises);

            const pokémonData: Pokémon[] = await Promise.all(pokémonPromises);
            const pokémon = pokémonData.map((currentPokémon: Pokémon) => {
                return {
                    name: currentPokémon.name,
                    id: currentPokémon.id,
                    img: currentPokémon.sprites.other["official-artwork"].front_default,
                    types: currentPokémon.types,
                    abilities: currentPokémon.abilities,
                    stats: currentPokémon.stats,
                };
            });
            this.pokémon = pokémon;
        },
        randomisePokémon(): object {
            this.randomPokémon = this.pokémon[Math.floor(Math.random() * this.pokémon.length)];
            return this.pokémon[Math.floor(Math.random() * this.pokémon.length)];
        },
        async getSinglePokémon(pokémon: any): Promise<Pokémon> {
            const URL = `https://pokeapi.co/api/v2/pokemon/${pokémon}`;
            const response: Response = await fetch(URL);
            const data: Pokémon = await response.json(); //type is not right
            console.log(data);
            return data;
        },
    },
});
