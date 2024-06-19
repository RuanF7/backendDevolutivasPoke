import { Request, Response } from "express";
import { RegisterStudentToCourseService } from "../../services/registerStudentToCourse/registerStudentToCourse";
import prisma from "../../../prismaClient";
import { BadRequestError } from "../../../errors/badRequestError";
import { NotFoundError } from "../../../errors/notFoundError";
import { InternalServerError } from "../../../errors/internalServerError";

const registerStudentToCourseService = new RegisterStudentToCourseService(
  prisma
);

export class RegisterStudentController {
  static async listCourses(req: Request, res: Response) {
    try {
      const cursos = await prisma.curso.findMany();
      res.status(200).json(cursos);
    } catch (error) {
      console.error("Erro ao buscar cursos:", error);
      res.status(500).json({ error: "Erro ao buscar cursos." });
    }
  }
  static async registerStudent(req: Request, res: Response) {
    const { alunoId, cursoId } = req.body;

    try {
      if (!alunoId || !cursoId) {
        throw new BadRequestError(
          "Faltam campos obrigatórios: alunoId, cursoId"
        );
      }

      const matricula =
        await registerStudentToCourseService.registerStudentToCourse({
          alunoId,
          cursoId,
        });

      if (!matricula) {
        throw new BadRequestError("Não foi possível matricular o aluno.");
      }

      console.log("Aluno matriculado com sucesso!:", matricula);
      res.status(200).json(matricula);
    } catch (error) {
      console.error("Erro ao matricular aluno:", error);

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
