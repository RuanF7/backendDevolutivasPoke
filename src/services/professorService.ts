import axios from 'axios';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface PokemonData {
  name: string;
  types: string[];
  moves: string[];
}

export const fetchPokemon = async (name: string): Promise<PokemonData> => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const types = response.data.types.map((type: any) => type.type.name);
    const moves = response.data.moves.map((move: any) => move.move.name);
    return {
      name: response.data.name,
      types: types,
      moves: moves,
    };
  } catch (error) {
    throw new Error('Failed to fetch Pokemon data');
  }
};

export class ProfessorService {
  async addPokemonToMochila(professorId: number, pokemonName: string) {
    const pokemon = await fetchPokemon(pokemonName);
    
    const professor = await prisma.professor.findUnique({
      where: { id: professorId },
      include: { Mochila: true },
    });

    if (!professor || !professor.Mochila) {
      throw new Error('Professor not found or has no mochila');
    }

    if (!pokemon.types.includes(professor.tipo)) {
      throw new Error('Pokemon type does not match professor type');
    }

    const newPokemon = await prisma.pokemon.create({
      data: {
        nome: pokemon.name,
        tipo: pokemon.types[0],
        mochilaId: professor.Mochila.id,
      },
    });

    return newPokemon;
  }

  async createProva(professorId: number, provaData: { nome: string, pokemonNomes: string[] }) {
    const professor = await prisma.professor.findUnique({
      where: { id: professorId },
      include: { Mochila: { include: { Pokemon: true } } },
    });

    if (!professor || !professor.Mochila) {
      throw new Error('Professor not found or has no mochila');
    }

    const pokemonIds = provaData.pokemonNomes.map(pokemonNome => {
      if (!professor.Mochila) {
        throw new Error('Professor has no mochila');
      }
      const pokemon = professor.Mochila.Pokemon.find(p => p.nome === pokemonNome);
      if (!pokemon) {
        throw new Error(`Pokemon ${pokemonNome} not found in mochila`);
      }
      return pokemon.id;
    });

    const newProva = await prisma.prova.create({
      data: {
        professorId,
        cursoId: 1, // placeholder, adjust accordingly
        dataCriacao: new Date(),
        Questao: {
          create: provaData.pokemonNomes.map((pokemonNome, index) => ({
            pokemonNome,
            perguntaTipo: 'type', // placeholder, adjust accordingly
            perguntaGolpe: 'move', // placeholder, adjust accordingly
          })),
        },
      },
    });

    return newProva;
  }
}
