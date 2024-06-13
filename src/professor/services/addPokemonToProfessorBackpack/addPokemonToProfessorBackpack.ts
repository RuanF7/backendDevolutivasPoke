import { Pokemon, PrismaClient } from "@prisma/client";
import { GetPokemonFromPokeAPI } from "../getPokemonFromPokeAPI/getPokemonFromPokeAPI";
import {
  Professor,
  ProfessorAddPokemonResponse,
} from "../../../types/professorTypes";

export class AddPokemonService {
  private prisma: PrismaClient;
  private getPokemonFromPokeAPI: GetPokemonFromPokeAPI;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.getPokemonFromPokeAPI = new GetPokemonFromPokeAPI();
  }
  async addPokemon(professor: Professor): Promise<Pokemon> {
    console.log("Fetching pokemon data for:", professor.nome);
    const pokemonData = await this.getPokemonFromPokeAPI.fetchPokemon(
      professor.nome
    );

    console.log("Creating pokemon in database with data:", pokemonData);
    const pokemon = await this.prisma.pokemon.create({
      data: {
        nome: pokemonData.nome,
        golpe: pokemonData.golpe[0],
        imagem: pokemonData.imagem,
        professorId: professor.id,
      },
    });

    const response: ProfessorAddPokemonResponse = {
      id: pokemon.id,
      nome: pokemon.nome,
      tipo: pokemonData.tipo,
      golpe: pokemon.golpe,
      imagem: pokemon.imagem,
      professorId: professor.id,
    };

    return response;
  }
}
