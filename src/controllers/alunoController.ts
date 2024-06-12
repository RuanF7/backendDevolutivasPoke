import { Request, Response } from "express";
import { StudentService } from "../services/alunoService";
import prisma from "../prismaClient";

const studentService = new StudentService(prisma);

export class StudentController {
  static async registerStudent(req: Request, res: Response) {
    const { alunoId, cursoId } = req.body;

    try {
      const matricula = await studentService.registerStudent({
        alunoId,
        cursoId,
      });
      res.status(201).json(matricula);
    } catch (error) {
      res.status(500).json({ error: "Falha ao matricular aluno" });
    }
  }
}

// export class AlunoController {
//   async matricularAluno(req: Request, res: Response) {
//     const { alunoId, cursoNome } = req.body;

//     console.log("Dados recebidos para matricular:", { alunoId, cursoNome });
//     try {
//       const curso = await prisma.curso.findFirst({
//         where: { nome: cursoNome },
//       });

//       if (!curso) {
//         return res.status(404).json({ error: "Curso não encontrado" });
//       }

//       const matricula = await alunoService.matricularAluno(alunoId, curso.nome);
//       res.status(201).json(matricula);
//     } catch (error) {
//       if (
//         error === "Aluno não encontrado" ||
//         error === "Curso não encontrado"
//       ) {
//         return res.status(404).json({ error: error });
//       }
//       res.status(500).json({ error: "Falha ao matricular aluno" });
//     }
//   }

//   async realizarProva(req: Request, res: Response) {
//     const { alunoId, provaId, respostas } = req.body;

//     try {
//       const respostasCriadas = await alunoService.realizarProva(
//         alunoId,
//         provaId,
//         respostas
//       );
//       res.status(201).json(respostasCriadas);
//     } catch (error) {
//       res.status(500).json({ error: "Falha ao realizar a prova" });
//     }
//   }
// }
