import { Pessoa, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserLogin } from "../../../types/userTypes";

const JWT_SECRET = process.env.JWT_SECRET as string;

export class UserLoginService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async loginUser(userLogin: UserLogin): Promise<Pessoa & { token: string }> {
    const loginUser = await this.prisma.pessoa.findUnique({
      where: { email: userLogin.email },
    });

    if (
      !loginUser ||
      !(await bcrypt.compare(userLogin.senha, loginUser.senha))
    ) {
      throw new Error("Credenciais inválidas");
    }

    const tokenPayload = {
      userId: loginUser.id,
      tipo: loginUser.tipo,
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log(`O Usuário ${loginUser.nome} está logado!`);
    return { ...loginUser, token };
  }
}
