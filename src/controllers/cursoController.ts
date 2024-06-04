import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CursoService } from '../services/cursoService';

const prisma = new PrismaClient();
const cursoService = new CursoService();

export class CursoController {
  async criarCurso(req: Request, res: Response) {
    const { tipo, professorId } = req.body;

    if (typeof tipo !== 'string' || typeof professorId !== 'number') {
      return res.status(400).json({ error: 'Invalid data format.' });
    }

    try {
      const curso = await cursoService.criarCurso(tipo, professorId);
      res.status(201).json(curso);
    } catch (error) {
      console.error('Erro ao criar o curso:', error);
      res.status(500).json({ error: 'Erro ao criar o curso' });
    }
  }

  async listarCursos(req: Request, res: Response) {
    try {
      const cursos = await cursoService.listarCursos();
      res.json(cursos);
    } catch (error) {
      console.error('Erro ao listar os cursos:', error);
      res.status(500).json({ error: 'Erro ao listar os cursos' });
    }
  }
}
