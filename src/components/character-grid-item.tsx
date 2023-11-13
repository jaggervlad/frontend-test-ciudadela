import { Character } from '@/services/api/types';
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material';

type CharacterGridItemProps = {
  character: Character;
};

export function CharacterGridItem({ character }: CharacterGridItemProps) {
  return (
    <Grid item key={character.id} xs={12} sm={6} lg={4}>
      <Card sx={{}}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="400"
            image={character.image}
            alt={`${character.name.toUpperCase()} AVATAR`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {character.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {character.species}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
