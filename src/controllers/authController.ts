// authController.ts
import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const userService = new UserService();

export class AuthController {
  async signup(req: Request, res: Response) {
    const { nome, email, senha, tipo, isProfessor } = req.body;

    try {
      if (isProfessor) {
        // Verificar se o curso correspondente ao tipo do professor já existe
        let curso = await prisma.curso.findFirst({
          where: { tipo }
        });

        // Se o curso não existir, criar um novo
        if (!curso) {
          const novoCurso = await prisma.curso.create({
            data: {
              nome: `Curso de ${tipo}`, // Você pode ajustar o nome do curso conforme necessário
              tipo
            }
          });
          // Atualiza a variável curso com o novo curso criado
          curso = novoCurso;
        }

        // Verifica se curso é undefined antes de continuar
        if (!curso) {
          throw new Error('Curso não encontrado');
        }

        // Criar o professor associado ao curso correspondente
        const professor = await prisma.professor.create({
          data: {
            tipo,
            Curso: { connect: { id: curso.id } },
            Pessoa: {
              create: {
                nome,
                email,
                senha
              }
            }
          }
        });

        res.status(201).json(professor);
      } else {
        // Se não for professor, criar como aluno
        const result = await userService.createUser({ nome, email, senha, tipo, isProfessor });
        res.status(201).json(result);
      }

      console.log('User created');
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async login(req: Request, res: Response) {
    const { email, senha } = req.body;

    try {
      const result = await userService.loginUser(email, senha);
      res.status(200).json(result);
      console.log('User logged in');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
