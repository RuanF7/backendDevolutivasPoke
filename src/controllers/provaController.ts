import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createProva = async (req: Request, res: Response) => {
  const { professorId, cursoId, questoes } = req.body;

  try {
    const prova = await prisma.prova.create({
      data: {
        professorId,
        cursoId,
        dataCriacao: new Date(),
        Questao: {
          create: questoes.map((questao: any) => ({
            pokemonNome: questao.pokemonNome,
            perguntaTipo: questao.perguntaTipo,
            perguntaGolpe: questao.perguntaGolpe,
          })),
        },
      },
    });

    res.status(201).json(prova);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create prova' });
  }
};
