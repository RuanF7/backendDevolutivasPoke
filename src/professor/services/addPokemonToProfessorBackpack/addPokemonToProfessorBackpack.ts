import { Pokemon, PrismaClient } from "@prisma/client";
import { fetchPokemon } from "../../../services/pokemonService";

interface Professor {
  id: number;
  nome: string;
  tipo: string;
}

export class AddPokemonService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async addPokemon(professor: Professor): Promise<Pokemon> {
    console.log("Fetching pokemon data for:", professor.nome);
    const pokemonData = await fetchPokemon(professor.nome);

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
  }
}
