import axios from 'axios';

export const fetchPokemon = async (name: string) => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return response.data;
};
