import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { CourseService } from "../services/cursoService";

const prisma = new PrismaClient();
const courseService = new CourseService(prisma);

export class CourseController {
  static async createCourse(req: Request, res: Response) {
    const { nome, professorId } = req.body;

    try {
      const curso = await courseService.createCourse({
        nome,
        professorId,
      });
      res.status(201).json(curso);
    } catch (error) {
      res.status(500).json({ error: error as Error });
    }
  }
}
// export class CursoController {
//   async criarCurso(req: Request, res: Response) {
//     const { tipo, professorId } = req.body;

//     if (typeof tipo !== 'string' || typeof professorId !== 'number') {
//       return res.status(400).json({ error: 'Invalid data format.' });
//     }

//     try {
//       const curso = await cursoService.criarCurso(tipo, professorId);
//       res.status(201).json(curso);
//     } catch (error) {
//       console.error('Erro ao criar o curso:', error);
//       res.status(500).json({ error: 'Erro ao criar o curso' });
//     }
//   }

//   async listarCursos(req: Request, res: Response) {
//     try {
//       const cursos = await cursoService.listarCursos();
//       res.json(cursos);
//     } catch (error) {
//       console.error('Erro ao listar os cursos:', error);
//       res.status(500).json({ error: 'Erro ao listar os cursos' });
//     }
//   }
// }
