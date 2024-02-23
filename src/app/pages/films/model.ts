// Arquivo: src/app/models/film.model.ts
export interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: Date;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: Date;
  edited: Date;
  url: string;
}

export interface FilmsApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Film[];
}