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

//NOTE: data from api that i need. does not reflect all data from api
interface PokéApiData {
    name: string;
    id: number;
    abilities: Array<{ name: string }>;
    moves: Array<{ move: { name: string; url: string } }>;
    sprites: PokéStripe;
    stats: Array<PokéStat>;
    types: Array<{ type: { name: string } }>;
}

//NOTE: interface of data whose values will come from an object that has the Pokémon model interface
// found this solution thanks to this: https://stackoverflow.com/questions/65815269/how-to-use-typescript-types-on-api-response-data/65815636#65815636
interface Pokémon {
    name: string;
    id: number;
    img: string;
    types: Array<{ type: { name: string } }>;
    abilities: Array<{ name: string }>;
    stats: Array<PokéStat>;
}

//NOTE: my state interface
interface PokéState {
    pokémon: Array<Pokémon>;
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
            const pokémonNames = data.results;

            const pokémonPromises = pokémonNames.map(async (currentPokémon) => {
                const URL = `https://pokeapi.co/api/v2/pokemon/${currentPokémon.name}`;
                const response: Response = await fetch(URL);
                const data: PokéApiData = await response.json();
                return data;
            });

            console.log(pokémonPromises);

            const pokémonData: Array<PokéApiData> = await Promise.all(pokémonPromises);
            const pokémon: Array<Pokémon> = pokémonData.map((currentPokémon: PokéApiData) => {
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
        randomisePokémon(): Pokémon {
            this.randomPokémon = this.pokémon[Math.floor(Math.random() * this.pokémon.length)];
            return this.pokémon[Math.floor(Math.random() * this.pokémon.length)];
        },
        async getSinglePokémon(singlePokémon: string): Promise<Pokémon> {
            const URL: string = `https://pokeapi.co/api/v2/pokemon/${singlePokémon}`;
            const response: Response = await fetch(URL);
            const data: PokéApiData = await response.json();
            const pokémon: Pokémon = {
                name: data.name,
                id: data.id,
                img: data.sprites.other["official-artwork"].front_default,
                types: data.types,
                abilities: data.abilities,
                stats: data.stats,
            };
            return pokémon;
        },
    },
});
