import { Pokemon, PrismaClient } from "@prisma/client";
import { GetPokemonFromPokeAPI } from "../getPokemonFromPokeAPI/getPokemonFromPokeAPI";
import {
  ProfessorAddPokemon,
  ProfessorAddPokemonResponse,
  PokemonData,
} from "../../../types/professorTypes";

export class AddPokemonService {
  private prisma: PrismaClient;
  private getPokemonFromPokeAPI: GetPokemonFromPokeAPI;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.getPokemonFromPokeAPI = new GetPokemonFromPokeAPI();
  }
  async addPokemon(
    data: ProfessorAddPokemon
  ): Promise<ProfessorAddPokemonResponse> {
    const { professorId, pokemonName } = data;

    console.log("Fetching pokemon data for:", pokemonName);

    const pokemonData: PokemonData =
      await this.getPokemonFromPokeAPI.fetchPokemon(pokemonName);

    console.log("Creating pokemon in database with data:", pokemonData);
    const pokemon = await this.prisma.pokemon.create({
      data: {
        nome: pokemonData.nome,
        golpe: pokemonData.golpe[0],
        imagem: pokemonData.imagem,
        professorId,
      },
    });

    const response: ProfessorAddPokemonResponse = {
      id: pokemon.id,
      nome: pokemon.nome,
      tipo: pokemonData.tipo,
      golpe: pokemon.golpe,
      imagem: pokemon.imagem,
      professorId: pokemon.professorId,
    };

    return response;
  }
}
