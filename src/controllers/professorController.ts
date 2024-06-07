import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { fetchPokemon } from '../services/pokemonService';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CursoService } from '../services/cursoService';
import { ProvaService } from '../services/provaService';

const prisma = new PrismaClient();
const cursoService = new CursoService();
const provaService = new ProvaService(prisma);

export class ProfessorController {
  static async addPokemonToMochila(req: Request, res: Response) {
    console.log('addPokemonToMochila method called');
    const { professorId, pokemonName } = req.body;
    console.log('Received request with professorId:', professorId, 'and pokemonName:', pokemonName);

    if (typeof professorId !== 'number') {
      return res.status(400).json({ error: 'Invalid data format. Expected professorId as number.' });
    }

    if (typeof pokemonName !== 'string') {
      return res.status(400).json({ error: 'Invalid data format. Expected pokemonName as string.' });
    }

    try {
      const professor = await prisma.professor.findUnique({
        where: { id: professorId },
        include: { Mochila: true },
      });

      if (!professor) {
        return res.status(404).json({ error: 'Professor not found' });
      }
      
      const pokemonData = await fetchPokemon(pokemonName);
      console.log(professor.tipo, pokemonData.tipo);
      if (pokemonData.tipo != professor.tipo) {        
        return res.status(400).json({ error: 'Pokemon type does not match professor type' });
      }

      const pokemon = await prisma.pokemon.create({
        data: {
          nome: pokemonData.name,
          tipo: pokemonData.tipo,
          mochilaId: professor.Mochila?.id ?? 0,
        },
      });
      console.log('Pokemon added to mochila:', pokemon);
      res.status(201).json(pokemon);
    } catch (error) {
      console.error('Error adding Pokémon to mochila:', error);
      res.status(500).json({ error: 'Failed to add Pokémon to mochila' });
    }
  
  }


  static async createProva(req: Request, res: Response) {
    const { professorId, provaData } = req.body;

    if (typeof professorId !== 'number' || !Array.isArray(provaData.pokemonNomes) || typeof provaData.nome !== 'string') {
      return res.status(400).json({ error: 'Invalid data format.' });
    }

    try {
      const professor = await prisma.professor.findUnique({
        where: { id: professorId },
        include: { Mochila: { include: { Pokemon: true } } }
      });

      if (!professor || !professor.Mochila) {
        return res.status(404).json({ error: 'Professor not found or has no mochila' });
      }

      const curso = await prisma.curso.findFirst({
        where: { tipo: professor.tipo }
      });

      if (!curso) {
        return res.status(404).json({ error: 'Course not found' });
      }

      const pokemonIds = provaData.pokemonNomes.map((pokemonNome: string) => {
        if (!professor.Mochila) {
          throw new Error('Mochila not found');
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
          cursoId: curso.id,
          dataCriacao: new Date(),
          nome: 'Prova Name',
          Questao: {
            create: provaData.pokemonNomes.map((pokemonNome: string) => ({
              pokemonNome,
              perguntaTipo: 'type',
              perguntaGolpe: 'move',
            })),
          },
        },
      });

      res.status(201).json(newProva);
    } catch (error) {
      console.error('Error creating prova:', error);
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2003') {
        res.status(400).json({ error: 'Foreign key constraint failed' });
      } else {
        res.status(500).json({ error: 'Failed to create prova' });
      }
    }
  }
  static async corrigirProva(req: Request, res: Response) {
    const { provaId, alunoId, correcao } = req.body;

    try {
      const devolutiva = await provaService.corrigirProva(provaId, alunoId, correcao);
      res.status(200).json(devolutiva);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}