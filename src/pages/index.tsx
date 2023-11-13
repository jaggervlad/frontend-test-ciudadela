import Head from 'next/head';
import { CharacterGridItem } from '@/components/character-grid-item';
import { PageHeader } from '@/components/page-header';
import { useGetCharacters } from '@/hooks/useGetCharacters';
import { createUrl } from '@/utils/utils';
import { Box, Container, Grid, Pagination, Skeleton } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

export enum SortBy {
  NONE = 'none',
  NAME = 'name',
}

export default function Home() {
  const { characters, info, isLoading, isError, setSorting } =
    useGetCharacters();
  const searchParams = useSearchParams();
  const defaultPage = Number(searchParams.get('page')) || 1;
  const router = useRouter();

  const newParams = new URLSearchParams(searchParams.toString());

  return (
    <>
      <Head>
        <title>Prueba tecnica Sebastian Acosta</title>
        <meta name="description" content="Prueba tecnica Sebastian Acosta" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box display={'flex'} flexDirection={'column'} minHeight={'100vh'}>
        <Container
          maxWidth="md"
          sx={{
            paddingY: '2rem',
            display: 'flex',
            gap: '3rem',
            flexDirection: 'column',
          }}
        >
          <PageHeader
            count={info?.count || 0}
            handleSorting={() => setSorting(SortBy.NAME)}
          />

          <Box component={'section'}>
            <Grid container spacing={3}>
              {isLoading &&
                Array.from(new Array(8)).map((i) => (
                  <Grid key={i} item xs={12} sm={6} lg={4}>
                    <Skeleton variant="rectangular" height={430} />

                    <Box sx={{ pt: 0.5 }}>
                      <Skeleton />
                      <Skeleton width="60%" />
                    </Box>
                  </Grid>
                ))}

              {!isLoading &&
                characters.length > 0 &&
                characters.map((c) => (
                  <CharacterGridItem character={c} key={c.id} />
                ))}
            </Grid>
          </Box>

          <Pagination
            sx={{ marginInline: 'auto' }}
            count={info?.pages || 0}
            page={defaultPage}
            onChange={(_, page) => {
              newParams.set('page', page.toString());
              newParams.delete('q');
              router.push(createUrl('/', newParams));
            }}
          />
        </Container>
      </Box>
    </>
  );
}
