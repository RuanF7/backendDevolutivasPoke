import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET as string;

interface UserInput {
  nome: string;
  email: string;
  senha: string;
  tipo?: string;
  isProfessor: boolean;
}

export class UserService {
  async createUser(userInput: UserInput) {
    const { nome, email, senha, tipo, isProfessor } = userInput;
    const hashedPassword = await bcrypt.hash(senha, 10);

    const pessoa = await prisma.pessoa.create({
      data: {
        nome,
        email,
        senha: hashedPassword,
        Aluno: isProfessor ? undefined : { create: {} },
        Professor:
          isProfessor && tipo
            ? {
                create: {
                  tipo,
                  Mochila: { create: {} },
                },
              }
            : undefined,
      },
    });

    if (isProfessor && tipo) {
      const curso = await prisma.curso.create({
        data: {
          nome: tipo,
          tipo: tipo,
          professorId: pessoa.id,
        },
      });
      console.log(
        `Curso '${curso.nome}' criado para o professor '${pessoa.nome}'`
      );
    }

    const token = jwt.sign(
      { userId: pessoa.id, isProfessor: isProfessor, tipo: tipo },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { token };
  }

  async loginUser(email: string, senha: string) {
    const pessoa = await prisma.pessoa.findUnique({
      where: { email },
      include: {
        Aluno: true,
        Professor: true,
      },
    });

    if (!pessoa || !(await bcrypt.compare(senha, pessoa.senha))) {
      throw new Error("Credenciais inválidas");
    }

    const isProfessor = !!pessoa.Professor;
    const tipo = isProfessor ? pessoa.Professor?.tipo : undefined;

    const token = jwt.sign(
      { userId: pessoa.id, isProfessor: isProfessor, tipo: tipo },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    console.log("userId:", pessoa.id.toString());

    return { token, isProfessor };
  }
}
