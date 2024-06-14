import { Request, Response } from "express";
import { UserRegisterService } from "../../services/createUser/createUser";

import prisma from "../../../prismaClient";
import { BadRequestError } from "../../../errors/badRequestError";
import { NotFoundError } from "../../../errors/notFoundError";
import { InternalServerError } from "../../../errors/internalServerError";

const userRegisterService = new UserRegisterService(prisma);

export class CreateUserController {
  async signUp(req: Request, res: Response) {
    const { email, nome, senha, tipo } = req.body;

    try {
      if (!email || !nome || !senha || !tipo) {
        throw new BadRequestError("Preencha todos os campos!");
      }

      const result = await userRegisterService.createUser({
        email,
        nome,
        senha,
        tipo,
      });

      if (!result) {
        throw new BadRequestError("Não foi possível criar o usuário.");
      }

      console.log("Usuário Criado com sucesso!:", result);
      res.status(200).json(result);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);

      if (error instanceof BadRequestError) {
        res.status(400).json({ message: error.message });
      } else if (error instanceof NotFoundError) {
        res.status(404).json({ message: error.message });
      } else {
        const internalError = new InternalServerError("Erro interno.");
        res.status(500).json({ message: internalError.message });
      }
    }
  }
}
