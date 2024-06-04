import { Request, Response } from 'express';
import { AlunoService } from '../services/alunoService';

const alunoService = new AlunoService();

export class AlunoController {
  async matricularAluno(req: Request, res: Response) {
    const { alunoId, cursoId } = req.body;

    try {
      const matricula = await alunoService.matricularAluno(alunoId, cursoId);
      res.status(201).json(matricula);
    } catch (error) {
      res.status(500).json({ error: 'Falha ao matricular aluno' });
    }
  }

  async realizarProva(req: Request, res: Response) {
    const { alunoId, provaId, respostas } = req.body;

    try {
      const respostasCriadas = await alunoService.realizarProva(alunoId, provaId, respostas);
      res.status(201).json(respostasCriadas);
    } catch (error) {
      res.status(500).json({ error: 'Falha ao realizar a prova' });
    }
  }
}
