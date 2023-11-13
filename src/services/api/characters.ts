import { api } from '.';
import { Characters } from './types';
export async function getCharacters({
  page = 1,
  filter,
}: {
  page?: number;
  filter?: any;
}): Promise<Characters> {
  const { data } = await api.get(`/characters?page=${page}`);

  return data.data as Characters;
}
