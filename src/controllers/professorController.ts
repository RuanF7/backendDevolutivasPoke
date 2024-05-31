import { Request, Response } from 'express';
import { ProfessorService } from '../services/professorService';

const professorService = new ProfessorService();

export class ProfessorController {
  async addPokemon(req: Request, res: Response) {
    const { professorId, pokemonName } = req.body;

    try {
      const newPokemon = await professorService.addPokemonToMochila(professorId, pokemonName);
      res.status(201).json(newPokemon);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async createProva(req: Request, res: Response) {
    const { professorId, provaData } = req.body;

    try {
      const newProva = await professorService.createProva(professorId, provaData);
      res.status(201).json(newProva);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}
