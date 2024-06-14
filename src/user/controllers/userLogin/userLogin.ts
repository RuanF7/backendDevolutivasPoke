import { Request, Response } from "express";
import { UserLoginService } from "../../services/userLogin/userLogin";
import { UserLogin } from "../../../types/userTypes";

import prisma from "../../../prismaClient";
import { BadRequestError } from "../../../errors/badRequestError";
import { NotFoundError } from "../../../errors/notFoundError";
import { InternalServerError } from "../../../errors/internalServerError";

const userLoginService = new UserLoginService(prisma);

export class UserLoginController {
  async login(req: Request, res: Response) {
    const { email, senha } = req.body;

    try {
      if (!email || !senha) {
        throw new BadRequestError("Preencha todos os campos!");
      }
      const result = await userLoginService.loginUser({ email, senha });

      if (!result) {
        throw new NotFoundError("Não foi possível logar o usuário.");
      }

      console.log("Usuário logado com sucesso!:", result);
      res.status(200).json(result);
    } catch (error) {
      console.error("Erro ao logar usuário:", error);

      if (error instanceof BadRequestError) {
        res.status(400).json({ message: error.message });
      } else if (error instanceof NotFoundError) {
        res.status(404).json({ message: error.message });
      } else {
        const internalServerError = new InternalServerError("Erro interno.");
        res.status(500).json({ message: internalServerError.message });
      }
    }
  }
}
