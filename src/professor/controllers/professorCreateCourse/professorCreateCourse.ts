import { Request, Response } from "express";
import prisma from "../../../prismaClient";
import { ProfessorCreateCourseService } from "../../services/professorCreateCourse/professorCreateCourse";
import { BadRequestError } from "../../../errors/badRequestError";
import { NotFoundError } from "../../../errors/notFoundError";
import { InternalServerError } from "../../../errors/internalServerError";

const professorCreateCourseService = new ProfessorCreateCourseService(prisma);

export class ProfessorCreateCourseController {
  static async createCourse(req: Request, res: Response) {
    const { nome, professorId } = req.body;

    try {
      if (!nome || !professorId) {
        throw new BadRequestError(
          "Faltam campos obrigatórios: nome, professorId"
        );
      }

      const curso = await professorCreateCourseService.createCourse({
        nome,
        professorId,
      });

      if (!curso) {
        throw new NotFoundError("Não foi possível criar o curso.");
      }
      console.log("Curso criado com sucesso!:", curso);
      res.status(200).json(curso);
    } catch (error) {
      console.error("Erro ao criar curso:", error);

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
