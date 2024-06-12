import { Request, Response } from "express";
import prisma from "../../../prismaClient";
import { ProfessorCreateCourseService } from "../../services/professorCreateCourse/professorCreateCourse";

const professorCreateCourseService = new ProfessorCreateCourseService(prisma);

export class ProfessorCreateCourseController {
  static async createCourse(req: Request, res: Response) {
    const { nome, professorId } = req.body;

    try {
      const curso = await professorCreateCourseService.createCourse({
        nome,
        professorId,
      });
      res.status(201).json(curso);
    } catch (error) {
      res.status(500).json({ error: error as Error });
    }
  }
}
