
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from './components/Header'
// import { Container } from '@mui/material'
import './App.css'
import PokemonList from "./components/PokemonList";
import RouteError from "./components/RouteError";

function App() {

  return (
    <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<PokemonList />} />
          {/* <Route path="/pokemon/:name" element={<PokemonDetailPage />} /> */}
          <Route path="*" element={<RouteError /> } />
        </Routes>
    </BrowserRouter>
  )
}

export default App;