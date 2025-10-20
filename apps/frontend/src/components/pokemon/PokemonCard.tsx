import { Card, CardContent, CardMedia, Typography } from "@mui/material";

interface PokemonCardProps {
  name: string;
  image: string;
  types?: string[];
  onClick?: () => void;
}

export function PokemonCard({ name, image, types = [], onClick }: PokemonCardProps) {
  return (
    <Card onClick={onClick}
      sx={{
        width: 250,
        textAlign: "center",
        cursor: "pointer",
        "&:hover": { boxShadow: 4 },
      }}>
      <CardMedia component="img" height="140" image={image} alt={name} sx={{ objectFit: "contain", mt: 1 }} />
      <CardContent>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {types?.join(", ")}
        </Typography>
      </CardContent>
    </Card>
  );
}