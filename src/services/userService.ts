import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
        Professor: isProfessor && tipo ? { 
          create: {
            tipo,
            Mochila: { create: {} } // Cria a mochila automaticamente ao criar o professor
          } 
        } : undefined,
      },
    });

    const token = jwt.sign({ userId: pessoa.id }, JWT_SECRET, { expiresIn: '1h' });

    return { token };
  }

  async loginUser(email: string, senha: string) {
    const pessoa = await prisma.pessoa.findUnique({ where: { email } });

    if (!pessoa || !(await bcrypt.compare(senha, pessoa.senha))) {
      throw new Error('Credenciais inválidas');
    }

    const token = jwt.sign({ userId: pessoa.id }, JWT_SECRET, { expiresIn: '1h' });

    return { token };
  }
}