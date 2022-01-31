export interface IMyPokemon {
  name: string;
  nickname: string;
  sprite?: string;
}

export interface IPokemon {
  name: string;
  captured?: number;
  url?: string;
  sprite?: string;
}

export interface IPokeSummary {
  name: string;
  captured: number;
}

/* Poke API response */

export interface IAllPokemonResponse {
  count: number;
  next?: string;
  previous?: string;
  results: IPokemon[];
}
