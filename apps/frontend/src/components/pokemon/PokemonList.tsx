import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { PokemonCard } from "./PokemonCard";
import { pikachuMock } from "../../mocks/pokemon.mock";
import { capitalizeFirstLetter } from "../../utils/stringUtils";
import { SearchInput } from "../SearchInput";
import { Loading } from "../Loading";
import { useNavigate } from "react-router-dom";

interface Pokemon {
  name: string;
  url?: string;
  [key: string]: any;
}

const mockList: Pokemon[] = [
  pikachuMock,
  { ...pikachuMock, name: "pikachu2", },
  { ...pikachuMock, name: "pikachu3", },
];

export default function PokemonList() {

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // update with real fetch when backend is connected
    setTimeout(() => {
      setPokemons(mockList);
      setFilteredPokemons(mockList);
      setLoading(false);
    }, 2000);
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
        {filteredPokemons.map((p, index) => (
          <Grid key={index}>
            <PokemonCard
              name={capitalizeFirstLetter(p.name)}
              image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
              types={p.types.map((t: any) => capitalizeFirstLetter(t.type.name))}
              onClick={() => navigate(`/pokemon/${p.name}`)}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}