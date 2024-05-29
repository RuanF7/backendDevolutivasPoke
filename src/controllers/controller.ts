import { Request, Response } from 'express';
import { fetchPokemon } from '../services/service';

export const getPokemon = async (req: Request, res: Response) => {
  const { name } = req.params;
  try {
    const pokemon = await fetchPokemon(name);
    res.json(pokemon);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Pokemon data' });
  }
};
