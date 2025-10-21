import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { getPokemonDetails } from "../../services/api";

import {
  Box,
  Typography,
  Button,
  Grid,
  Chip,
  Snackbar,
} from "@mui/material";
import { Loading } from "../Loading";
import { capitalizeFirstLetter } from "../../utils/stringUtils";
import EmptyListState from "../EmptyState";
import IconButton from '@mui/material/IconButton';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import LinearProgress from '@mui/material/LinearProgress';
import { usePokemonStore } from "../../store/pokemonStore";

interface PokemonDetails {
  name: string;
  sprites?: { front_default: string };
  types: { type: { name: string } }[];
  height: number;
  weight: number;
  abilities: { ability: { name: string } }[];
  stats: { stat: { name: string }; base_stat: number }[];
  id: number;
  [key: string]: any;
}

export default function PokemonDetailPage() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const { toggleFavorite, isFavorite } = usePokemonStore();
  const [fave, setFave] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const prevFave = useRef(fave);

  useEffect(() => {
  const fetchDetails = async () => {
    if (!name) return;
    try {
      const data = await getPokemonDetails(name);
      setPokemon(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  fetchDetails();
}, [name]);

  useEffect(() => {
    if (pokemon) {
      // Store previous value before updating
      prevFave.current = fave;
      const currentIsFavorite = isFavorite(pokemon.id);
      setFave(currentIsFavorite);
    }
  }, [pokemon, isFavorite]);

  if (loading)
    return <Loading text="Loading Pokémon details..." />;

  if (!pokemon || pokemon === undefined)
    return <EmptyListState text={"No Pokémon found"} />;

  const handleToggleFavorite = async () => {
    if (!pokemon) return;
    await toggleFavorite({ name: pokemon.name, id: pokemon.id });
    const newFave = !fave;
    setFave(newFave);

    // Show snackbar only if the favorite state actually changed
    if (newFave && !prevFave.current) {
      setSnackbarMessage(`${capitalizeFirstLetter(pokemon.name)} added to favorites!`);
      setOpenSnackbar(true);
    } else if (!newFave && prevFave.current) {
      setSnackbarMessage(`${capitalizeFirstLetter(pokemon.name)} removed from favorites!`);
      setOpenSnackbar(true);
    }
    prevFave.current = newFave;
  };

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '80vh', mb: 4 }}>
      <Grid size={8} >
        <Box sx={{ p: 4, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper', textAlign: 'center' }}>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            message={snackbarMessage}
            color="secondary.main"
            onClose={() => setOpenSnackbar(false)}
          />

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
                onClick={(e) => {
                  e.stopPropagation(); // avoid triggering onClick navigation
                  handleToggleFavorite();
                }}
              >
                {fave ? <Favorite /> : <FavoriteBorder /> }
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
            <Typography sx={{ mt: 2 }}>Height: <b>{pokemon.height}</b></Typography>
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