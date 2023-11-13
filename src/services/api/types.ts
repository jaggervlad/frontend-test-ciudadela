export interface Characters {
  results: Character[];
  info: Info;
}

export interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
}

export interface Info {
  count: number;
  pages: number;
  next?: number | null;
  prev?: number | null;
}
