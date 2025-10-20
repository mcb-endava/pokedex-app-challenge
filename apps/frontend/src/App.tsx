
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from './components/Header'
import './App.css'
import PokemonList from "./components/pokemon/PokemonList";
import RouteError from "./components/RouteError";
import PokemonDetails from "./components/pokemon/PokemonDetails";

function App() {

  return (
    <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
          <Route path="*" element={<RouteError /> } />
        </Routes>
    </BrowserRouter>
  )
}

export default App;