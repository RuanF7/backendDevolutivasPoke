import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export class UserLoginService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async loginUser(email: string, senha: string) {
    const user = await this.prisma.pessoa.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(senha, user.senha))) {
      throw new Error("Credenciais inválidas");
    }

    const token = jwt.sign({ userId: user.id, tipo: user.tipo }, JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log(`O Usuário ${user.nome} está logado!`);
    return { token, tipo: user.tipo };
  }
}
