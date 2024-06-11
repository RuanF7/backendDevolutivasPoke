import axios from "axios";

interface PokemonData {
  nome: string;
  tipo: string;
  golpe: string;
  imagem: string;
}

export const fetchPokemon = async (name: string): Promise<PokemonData> => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
    );
    const pokemonData: PokemonData = {
      nome: response.data.name,
      tipo: response.data.types[0].type.name,
      imagem: response.data.sprites.front_default,
      golpe: response.data.moves.map(
        (move: { move: { name: string } }) => move.move.name
      ),
    };
    return pokemonData;
  } catch (error) {
    throw new Error("Failed to fetch Pokémon data");
  }
};
