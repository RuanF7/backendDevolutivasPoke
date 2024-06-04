import axios from 'axios';

interface PokemonData {
  name: string;
  tipo: string;
  imagem: string;
  moves: string[];
}

export const fetchPokemon = async (name: string): Promise<PokemonData> => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    const types = response.data.types.map((typeEntry: any) => typeEntry.type.name);
    const pokemonData: PokemonData = {
      name: response.data.name,
      tipo: types[0],
      imagem: response.data.sprites.front_default,
      moves: response.data.moves.map((move: any) => move.move.name)
    };
    return pokemonData;
  } catch (error) {
    throw new Error('Failed to fetch Pokémon data');
  }
};
