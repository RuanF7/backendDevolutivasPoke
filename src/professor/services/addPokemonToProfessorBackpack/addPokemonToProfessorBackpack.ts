import { Pokemon, PrismaClient } from "@prisma/client";
import { GetPokemonFromPokeAPI } from "../getPokemonFromPokeAPI/getPokemonFromPokeAPI";
import { Professor } from "../../../types/professorTypes";

export class AddPokemonService {
  private prisma: PrismaClient;
  private getPokemonFromPokeAPI: GetPokemonFromPokeAPI;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.getPokemonFromPokeAPI = new GetPokemonFromPokeAPI();
  }
  async addPokemon(professor: Professor): Promise<Pokemon> {
    console.log("Fetching pokemon data for:", professor.nome);
    try {
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

      console.log("Pokemon created:", pokemon);
      return pokemon;
    } catch (error) {
      throw new Error(
        `Failed to add Pokémon for professor ${professor.nome}: ${error}`
      );
    }
  }
}
