import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
// import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Grid,
  Chip,
} from "@mui/material";
import { Loading } from "../Loading";
import { pikachuMock } from "../../mocks/pokemon.mock";
import { capitalizeFirstLetter } from "../../utils/stringUtils";

interface PokemonDetails {
  name: string;
  sprites?: { front_default: string };
  types: { type: { name: string } }[];
  height: number;
  weight: number;
  abilities: { ability: { name: string } }[];
  stats: { stat: { name: string }; base_stat: number }[];
  [key: string]: any;
}

export default function PokemonDetailPage() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // axios
    //   .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    //   .then((res) => setPokemon(res.data))
    //   .catch(console.error)
    //   .finally(() => setLoading(false));
    setTimeout(() => {
      // Mock data since backend is not connected
      setPokemon({...pikachuMock});
      setLoading(false);
    }, 2000);   
  }, [name]);

  if (loading)
    return (
      <Grid container justifyContent="center" sx={{ mt: 10 }}>
        <Loading text="Loading Pokémon details..." />
      </Grid>
    );

  if (!pokemon)
    return (
      <Typography variant="h6" color="error">
        Pokémon not found.
      </Typography>
    );

  return (
    <Box sx={{ p: 4 }}>
      <Button component={Link} to="/" variant="outlined" sx={{ mb: 2 }}>
        ← Back
      </Button>

      <Typography variant="h4" sx={{ textTransform: "capitalize", mb: 2 }}>
        {pokemon.name}
      </Typography>

      <Box
        component="img"
        src={pokemon.sprites?.front_default}
        alt={pokemon.name}
        sx={{ width: 150, height: 150 }}
      />

      <Box sx={{ mt: 2 }}>
        <Typography variant="h6">Types:</Typography>
        {pokemon.types.map((t) => (
          <Chip key={t.type.name} label={t.type.name} sx={{ mr: 1, mt: 1 }} />
        ))}
      </Box>

      <Typography sx={{ mt: 2 }}>Height: {pokemon.height}</Typography>
      <Typography>Weight: {pokemon.weight}</Typography>

      <Typography variant="h6" sx={{ mt: 2 }}>
        Abilities:
      </Typography>
      {pokemon.abilities.map((a) => (
        <Chip key={a.ability.name} label={a.ability.name} sx={{ mr: 1, mt: 1 }} />
      ))}

      <Typography variant="h6" sx={{ mt: 2 }}>
        Stats:
      </Typography>
      {pokemon.stats.map((s) => (
        <Typography key={s.stat.name}>
          {capitalizeFirstLetter(s.stat.name)}: {s.base_stat}
        </Typography>
      ))}
    </Box>
  );
}