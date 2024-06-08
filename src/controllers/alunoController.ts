import { Request, Response } from "express";
import { AlunoService } from "../services/alunoService";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const alunoService = new AlunoService();

export class AlunoController {
  async matricularAluno(req: Request, res: Response) {
    const { alunoId, cursoNome } = req.body;

    console.log("Dados recebidos para matricular:", { alunoId, cursoNome });
    try {
      const curso = await prisma.curso.findFirst({
        where: { nome: cursoNome },
      });

      if (!curso) {
        return res.status(404).json({ error: "Curso não encontrado" });
      }

      const matricula = await alunoService.matricularAluno(alunoId, curso.nome);
      res.status(201).json(matricula);
    } catch (error) {
      if (
        error === "Aluno não encontrado" ||
        error === "Curso não encontrado"
      ) {
        return res.status(404).json({ error: error });
      }
      res.status(500).json({ error: "Falha ao matricular aluno" });
    }
  }

  async realizarProva(req: Request, res: Response) {
    const { alunoId, provaId, respostas } = req.body;

    try {
      const respostasCriadas = await alunoService.realizarProva(
        alunoId,
        provaId,
        respostas
      );
      res.status(201).json(respostasCriadas);
    } catch (error) {
      res.status(500).json({ error: "Falha ao realizar a prova" });
    }
  }
}
