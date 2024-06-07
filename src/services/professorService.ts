import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import { fetchPokemon } from './pokemonService';

const prisma = new PrismaClient();

export class ProfessorService {
  async addPokemonToMochila(professorId: number, pokemonName: string) {
    const pokemon = await fetchPokemon(pokemonName);
    console.log('Received request with professorId:', professorId, 'and pokemonName:', pokemonName);
    console.log('Fetched pokemon:', pokemon);

    const professor = await prisma.professor.findUnique({
      where: { id: professorId },
      include: { Mochila: true },
    });

    console.log('Found professor:', professor);
    console.log('Pokemon:', pokemon);
    if (!professor || !professor.Mochila) {
      throw new Error('Professor not found or has no mochila');
    }
    console.log('Pokemon:', pokemon);
    console.log('Professor type:', professor.tipo);
    console.log('Pokemon types:', pokemon.tipo);

    if ( pokemon.tipo != professor.tipo) {
      throw new Error('Pokemon type does not match professor type');
    }

    const newPokemon = await prisma.pokemon.create({
      data: {
        nome: pokemon.name,
        tipo: pokemon.tipo,
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
        nome: 'Prova Name', 
        professorId,
        cursoId: 1,
        dataCriacao: new Date(),
        Questao: {
          create: provaData.pokemonNomes.map((pokemonNome, index) => ({
            pokemonNome,
            perguntaTipo: 'type', 
            perguntaGolpe: 'move',
            imagem: '', 
          })),
        },
      },
    });

    return newProva;
  }
}