import axios from 'axios';

interface PokemonData {
  name: string;
  tipo: string;
}

export const fetchPokemon = async (name: string): Promise<PokemonData> => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const types = response.data.types.map((typeEntry: any) => typeEntry.type.name);
    const pokemonData: PokemonData = {
      name: response.data.name,
      tipo: types[0]  // Supondo que estamos interessados no primeiro tipo do Pokémon
    };
    return pokemonData;
  } catch (error) {
    throw new Error('Failed to fetch Pokémon data');
  }
};
