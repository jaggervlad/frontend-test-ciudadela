import { Typography, Box, Button } from '@mui/material';
import { SearchForm } from './search-form';

type PageHeaderProps = {
  count: number;
  handleSorting: () => void;
};

export function PageHeader({ count, handleSorting }: PageHeaderProps) {
  return (
    <>
      <Typography
        variant="h1"
        fontSize={50}
        textAlign={'center'}
        fontWeight={'bold'}
        flexShrink={0}
      >
        Rick & Morty
      </Typography>

      <SearchForm />

      <Box display="flex" alignItems={'start'} gap={4}>
        <Typography fontSize={25} variant="body1" marginBottom={4}>
          Cantidad de personajes: {count}
        </Typography>
        <Button variant="contained" onClick={handleSorting}>
          Ordenar por nombre
        </Button>
      </Box>
    </>
  );
}
