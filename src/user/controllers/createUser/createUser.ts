import { Request, Response } from "express";
import { UserRegisterService } from "../../services/createUser/createUser";

import prisma from "../../../prismaClient";

const userRegisterService = new UserRegisterService(prisma);

export class CreateUserController {
  async signUp(req: Request, res: Response) {
    const { email, nome, senha, tipo } = req.body;

    try {
      const result = await userRegisterService.createUser({ email, nome, senha, tipo });
      res.status(201).json(result);
      console.log("Usuário criado com sucesso!");
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}
