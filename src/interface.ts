export interface IMyPokemon {
  name: string;
  nickname: string;
}

export interface IPokemon {
  name: string;
  captured?: number;
  url?: string;
}

/* Poke API response */

export interface IAllPokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPokemon[];
}
