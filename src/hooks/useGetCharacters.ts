import { SortBy } from '@/pages';
import { getCharacters } from '@/services/api/characters';
import { Character } from '@/services/api/types';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useState, useMemo, useEffect } from 'react';

export function useGetCharacters() {
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();
  const defaultQuery = searchParams.get('q') || '';
  const defaultPage = Number(searchParams.get('page')) || 1;
  const { data, isLoading, isError } = useQuery({
    queryKey: ['character', page],
    queryFn: async ({ queryKey }) => {
      const data = await getCharacters({ page: page });
      return data;
    },
  });

  useEffect(() => {
    if (defaultPage) {
      setPage(defaultPage);
    }
  }, [defaultPage]);

  const filteredCharacters = useMemo(() => {
    if (!data) return [];

    let filtered = [...data.results];

    if (defaultQuery) {
      filtered = filtered.filter((c) =>
        c.name.toLowerCase().includes(defaultQuery.toLowerCase())
      );
    }

    return filtered;
  }, [data, defaultQuery]);

  const sortedCharacters = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredCharacters;

    const compareProperties: Record<string, (char: Character) => any> = {
      [SortBy.NAME]: (char) => char.name,
    };

    return filteredCharacters.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting];
      return extractProperty(a).localeCompare(extractProperty(b));
    });
  }, [filteredCharacters, sorting]);

  return {
    info: data?.info,
    characters: sortedCharacters,
    isLoading,
    isError,
    setSorting,
  };
}
