import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../service/api";

import {
  Box,
  Typography,
  Button,
  Grid,
  Chip,
} from "@mui/material";
import { Loading } from "../Loading";
import { capitalizeFirstLetter } from "../../utils/stringUtils";
import EmptyListState from "../EmptyState";
import IconButton from '@mui/material/IconButton';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import LinearProgress from '@mui/material/LinearProgress';

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
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    api.get(`/pokemon/${name}`)
      .then((res) => setPokemon(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [name]);

  if (loading)
    return <Loading text="Loading Pokémon details..." />;

  if (!pokemon)
    return <EmptyListState text={"No Pokémon found"} />;

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '80vh', mb: 4}}>
      <Grid size={8} >
        <Box sx={{ p: 4, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper', textAlign: 'center' }}>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2,
              position: 'relative',
            }}
          >
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
              <Button component={Link} to="/" variant="contained">
                ← Back
              </Button>
            </Box>

            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <Typography variant="h4" sx={{ textTransform: "capitalize" }}>
                {pokemon.name}
              </Typography>
            </Box>

            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton
                aria-label="favorite"
                color="secondary"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                {isFavorite ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </Box>
          </Box>

          <Box
            component="img"
            src={pokemon.sprites?.front_default}
            alt={pokemon.name}
            sx={{ width: 150, height: 150 }}
          />

          <Box>
            <Typography sx={{ mt: 2}}>Height: <b>{pokemon.height}</b></Typography>
            <Typography>Weight: <b>{pokemon.weight}</b></Typography>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Types:</Typography>
            {pokemon.types.map((t) => (
              <Chip key={t.type.name} label={t.type.name} sx={{ mr: 1, mt: 1 }} color="secondary" />
            ))}
          </Box>

          <Typography variant="h6" sx={{ mt: 2 }}>
            Abilities:
          </Typography>
          {pokemon.abilities.map((a) => (
            <Chip key={a.ability.name} label={a.ability.name} sx={{ mr: 1, mt: 1 }} color="primary" />
          ))}

          <Typography variant="h6" sx={{ mt: 2 }}>
            Stats:
          </Typography>
          <Box sx={{ mt: 1 }}>
            {pokemon.stats.map((s) => (
              <Box key={s.stat.name} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2">
                    {capitalizeFirstLetter(s.stat.name)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {s.base_stat}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={Math.min(s.base_stat, 100)}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: '#eee',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: 'secondary.main',
                    },
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}