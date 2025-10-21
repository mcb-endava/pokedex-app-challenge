import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getPokemonDetails = async (name: string) => {
  const response = await api.get(`/pokemon/${name}`);
  return response?.data;
};

export const getPokemonList = async (limit = 50) => {
  const response = await api.get(`/pokemon?limit=${limit}`);
  return response?.data.results;
};

export default api;