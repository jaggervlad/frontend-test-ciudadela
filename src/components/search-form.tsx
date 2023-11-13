import { createUrl } from '@/utils/utils';
import { Search } from '@mui/icons-material';
import { Box, Button, TextField } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useState } from 'react';

export function SearchForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const defaultQuery = searchParams?.get('q') || '';
  const [query, setQuery] = useState(defaultQuery);

  return (
    <form
      onClick={(e) => {
        e.preventDefault();
        const newParams = new URLSearchParams(searchParams.toString());

        if (query) {
          newParams.set('q', query);
        } else {
          newParams.delete('q');
        }

        router.push(createUrl('/', newParams));
      }}
    >
      <Box display={'flex'} gap={2}>
        <TextField
          defaultValue={query}
          variant="outlined"
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
        />
        <Button type="submit" variant="outlined">
          <Search />
        </Button>
      </Box>
    </form>
  );
}
