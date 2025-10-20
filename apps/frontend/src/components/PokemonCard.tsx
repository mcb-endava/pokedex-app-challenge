import { Card, CardContent, CardMedia, Typography } from "@mui/material";

interface PokemonCardProps {
  name: string;
  image: string;
  types: string[];
}

export function PokemonCard({ name, image, types }: PokemonCardProps) {
  return (
    <Card sx={{ width: 200, textAlign: "center" }}>
      <CardMedia component="img" height="140" image={image} alt={name} />
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {types.join(", ")}
        </Typography>
      </CardContent>
    </Card>
  );
}