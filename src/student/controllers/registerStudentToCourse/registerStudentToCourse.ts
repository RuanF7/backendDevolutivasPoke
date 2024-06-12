import { Request, Response } from "express";
import { RegisterStudentToCourseService } from "../../services/registerStudentToCourse/registerStudentToCourse";
import prisma from "../../../prismaClient";

const registerStudentToCourseService = new RegisterStudentToCourseService(
  prisma
);

export class RegisterStudentController {
  static async registerStudent(req: Request, res: Response) {
    const { alunoId, cursoId } = req.body;

    try {
      const matricula =
        await registerStudentToCourseService.registerStudentToCourse({
          alunoId,
          cursoId,
        });
      res.status(201).json(matricula);
    } catch (error) {
      res.status(500).json({ error: "Falha ao matricular aluno" });
    }
  }
}
