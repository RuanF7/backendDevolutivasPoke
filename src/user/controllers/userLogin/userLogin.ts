import { Request, Response } from "express";
import { UserLoginService } from "../../services/userLogin/userLogin";
import { UserLogin } from "../../../types/userTypes";

import prisma from "../../../prismaClient";

const userLoginService = new UserLoginService(prisma);

export class UserLoginController {
  async login(req: Request, res: Response) {
    const { email, senha } = req.body;

    try {
      const userLogin: UserLogin = { email, senha };
      const result = await userLoginService.loginUser(userLogin);
      res.status(200).json(result);
      console.log("Usuário logado com sucesso!");
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
