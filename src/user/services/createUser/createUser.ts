import { Pessoa, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { UserInput } from "../../../types/userTypes";

export class UserRegisterService {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  async createUser(userInput: UserInput): Promise<Pessoa> {
    const registeredUser = await this.prisma.pessoa.findUnique({
      where: { email: userInput.email },
    });

    if (registeredUser) {
      throw new Error("Usuário já registrado");
    }

    const hashedPassword = await bcrypt.hash(userInput.senha, 10);

    const user = await this.prisma.pessoa.create({
      data: {
        nome: userInput.nome,
        email: userInput.email,
        senha: hashedPassword,
        tipo: userInput.tipo,
      },
    });
    console.log(`Usuário ${user.nome} criado com sucesso`);
    return user;
  }
}
