import { Request, Response } from "express";
import prisma from "../../../prismaClient";
import { ProfessorCreateTestService } from "../../services/professorCreateTest/professorCreateTest";
import { BadRequestError } from "../../../errors/badRequestError";
import { NotFoundError } from "../../../errors/notFoundError";
import { InternalServerError } from "../../../errors/internalServerError";

const professorCreateTestService = new ProfessorCreateTestService(prisma);

export class ProfessorCreateTestController {
  static async professorCreateTest(req: Request, res: Response) {
    const { nome, cursoId } = req.body;

    try {
      if (!nome || !cursoId) {
        throw new BadRequestError("Faltam campos obrigatórios: nome, cursoId");
      }

      const test = await professorCreateTestService.createTest({
        nome,
        cursoId,
      });

      if (!test) {
        throw new NotFoundError("Não foi possível criar a prova.");
      }

      console.log("Prova criada com sucesso!:", test);
      res.status(200).json(test);
    } catch (error) {
      console.error("Erro ao criar prova:", error);

      if (error instanceof BadRequestError) {
        res.status(400).json({ message: error.message });
      } else if (error instanceof NotFoundError) {
        res.status(404).json({ message: error.message });
      } else {
        const internalError = new InternalServerError("Erro no servidor.");
        return res.status(500).json({ error: internalError.message });
      }
    }
  }
}
