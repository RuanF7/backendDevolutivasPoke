import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { fetchPokemon } from '../services/pokemonService';

const prisma = new PrismaClient();

export class ProfessorController {
  static async addPokemonToMochila(req: Request, res: Response) {
    const { professorId, pokemonName } = req.body;

    if (typeof professorId !== 'number') {
      console.log('Request body:', req.body);

      return res.status(400).json({ error: 'Invalid data format. Expected professorId as number.' });
    }

    if (typeof pokemonName !== 'string') {
      return res.status(400).json({ error: 'Invalid data format. Expected pokemonName as string.' });
    }

    try {
      console.log('Received request to add Pokémon to mochila. Professor ID:', professorId, 'Pokemon Name:', pokemonName);

      const professor = await prisma.professor.findUnique({
        where: { id: professorId },
        include: { Mochila: true }
      });
      console.log('Retrieved professor:', professor);
      if (!professor) {
        return res.status(404).json({ error: 'Professor not found' });
      }

      const pokemonData = await fetchPokemon(pokemonName);
      console.log('Fetched Pokémon data:', pokemonData);

      let data: any = {
        nome: pokemonData.name,
        tipo: pokemonData.tipo,
      };

      if (professor.Mochila) {
        data = {
          ...data,
          mochilaId: professor.Mochila.id,
        };
      }

      const pokemon = await prisma.pokemon.create({
        data,
      });
      console.log('Created Pokémon:', pokemon);

      res.status(201).json(pokemon);
    } catch (error) {
      console.error('Error adding Pokémon to mochila:', error);
      res.status(500).json({ error: 'Failed to add Pokémon to mochila' });
    }
  }
}
