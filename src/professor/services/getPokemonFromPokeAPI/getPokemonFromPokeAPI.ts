import axios from "axios";
import {
  PokemonData,
  PokemonDataResponse,
} from "../../../types/professorTypes";

export class GetPokemonFromPokeAPI {
  private apiUrl: string;

  constructor(apiUrl: string = "https://pokeapi.co/api/v2/pokemon") {
    this.apiUrl = apiUrl;
  }

  async fetchPokemon(name: string): Promise<PokemonData> {
    const pokemonResponse = await axios.get(
      `${this.apiUrl}/${name.toLowerCase()}`
    );
    const pokemonData: PokemonData = {
      nome: pokemonResponse.data.name,
      tipo: pokemonResponse.data.types[0].type.name,
      imagem: pokemonResponse.data.sprites.front_default,
      golpe: pokemonResponse.data.moves.map(
        (move: { move: { name: string } }) => move.move.name
      ),
    };

    const response: PokemonDataResponse = {
      id: pokemonResponse.data.id,
      nome: pokemonData.nome,
      tipo: pokemonData.tipo,
      imagem: pokemonData.imagem,
      golpe: pokemonData.golpe[0],
    };

    return response;
  }
}
