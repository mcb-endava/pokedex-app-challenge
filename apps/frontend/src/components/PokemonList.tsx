import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { PokemonCard } from "../components/PokemonCard";
import { pikachuMock } from "../mocks/pokemon.mock";
import { capitalizeFirstLetter } from "../utils/stringUtils";

interface Pokemon {
  name: string;
  url?: string;
  [key: string]: any;
}

const mockList: Pokemon[] = [
    pikachuMock,
  { ...pikachuMock, name: "pikachu2",},
  { ...pikachuMock, name: "pikachu3",},
];

export default function PokemonList() {

const [pokemons, setPokemons] = useState<Pokemon[]>(mockList);

  return (
    <Grid container spacing={4} justifyContent="center">
      {pokemons.map((p, index) => (
        <Grid key={index}>
          <PokemonCard
            name={capitalizeFirstLetter(p.name)}
            image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
            types={p.types.map((t: any) => capitalizeFirstLetter(t.type.name))}
          />
        </Grid>
      ))}
    </Grid>
  );
}