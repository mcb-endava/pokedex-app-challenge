import { usePokemonStore } from "../../store/pokemonStore";
import { Grid } from "@mui/material";
import { PokemonCard } from "./PokemonCard";
import { capitalizeFirstLetter } from "../../utils/stringUtils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Loading } from "../Loading";
import EmptyListState from "../EmptyState";

export default function PokemonFavoritesList() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { favorites } = usePokemonStore();

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  if (loading)
    return <Loading text="Catching favorite Pokemons..." />;

  return (
    <>
      <Grid container spacing={4} justifyContent="center">
        {
          favorites.length === 0 ?
            <EmptyListState text={"No favorite Pokémons found"} /> :
            favorites.map((favorite, index) => {
              return (
                <Grid key={index}>
                  <PokemonCard
                    name={capitalizeFirstLetter(favorite.name)}
                    image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${favorite.id}.png`}
                    onClick={() => navigate(`/pokemon/${favorite.name}`)}
                  />
                </Grid>
              )
            })
        }
      </Grid>
    </>
  );
}