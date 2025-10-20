
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from './components/Header'
import './App.css'
import PokemonList from "./components/pokemon/PokemonList";
import RouteError from "./components/RouteError";
import PokemonDetails from "./components/pokemon/PokemonDetails";
import { useEffect } from "react";
import { usePokemonStore } from "./store/pokemonStore";
import PokemonFavoritesList from "./components/pokemon/PokemonFavoritesList";

function App() {
  const { fetchFavorites } = usePokemonStore();
  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:name" element={<PokemonDetails />} />
        <Route path="/favorites" element={<PokemonFavoritesList />} />
        <Route path="*" element={<RouteError />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;