import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { PokemonCard } from "./PokemonCard";
import { capitalizeFirstLetter } from "../../utils/stringUtils";
import { SearchInput } from "../SearchInput";
import { Loading } from "../Loading";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";

interface Pokemon {
  name: string;
  url?: string;
  [key: string]: any;
}

export default function PokemonList() {

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/pokemon?limit=20');
        const results = response.data.results;
        console.log(results);
        
        setPokemons(results);
        setFilteredPokemons(response.data.results);
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

   useEffect(() => {
    const term = search.toLowerCase();
    const filteredList = pokemons.filter((p) => p.name.includes(term));
    setFilteredPokemons(filteredList);
  }, [search, pokemons]);

  if (loading)
    return <Loading text="Catching Pokemons..." />;

  return (
    <>
      <SearchInput value={search} onChange={setSearch} />
      <Grid container spacing={4} justifyContent="center">
        {filteredPokemons.map((p, index) => {
          const id = p.url?.split("/")[6];
          return (
            <Grid key={index}>
              <PokemonCard
                name={capitalizeFirstLetter(p.name)}
                image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                onClick={() => navigate(`/pokemon/${p.name}`)}
            />
          </Grid>
        )})}
      </Grid>
    </>
  );
}