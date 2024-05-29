import axios from 'axios';

interface PokemonData {
  name: string;
  move: string;
}

export const fetchPokemon = async (name: string): Promise<PokemonData> => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const moves = response.data.moves;
    const move = moves.length > 0 ? moves[0].move.name : 'No moves found';
    const pokemonData: PokemonData = {
      name: response.data.name,
      move: move
    };
    return pokemonData;
  } catch (error) {
    throw new Error('Failed to fetch Pokemon data');
  }
};
