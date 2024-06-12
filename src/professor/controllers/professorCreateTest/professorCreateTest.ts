import { Request, Response } from "express";
import prisma from "../../../prismaClient";
import { ProfessorCreateTestService } from "../../services/professorCreateTest/professorCreateTest";

const professorCreateTestService = new ProfessorCreateTestService(prisma);

export class ProfessorCreateTestController {
  static async professorCreateTest(req: Request, res: Response) {
    const { nome, cursoId } = req.body;

    try {
      const test = await professorCreateTestService.createTest({
        nome,
        cursoId,
      });
      res.status(201).json(test);
    } catch (error) {
      res.status(500).json({ error: error as Error });
    }
  }
}
