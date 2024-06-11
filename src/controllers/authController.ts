import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const userService = new UserService(prisma);

export class AuthController {
  async signUp(req: Request, res: Response) {
    const { email, nome, senha, tipo } = req.body;

    try {
      const result = await userService.createUser({ email, nome, senha, tipo });
      res.status(201).json(result);
      console.log("Usuário criado com sucesso!");
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async login(req: Request, res: Response) {
    const { email, senha } = req.body;

    try {
      const result = await userService.loginUser(email, senha);
      res.status(200).json(result);
      console.log("Usuário logado com sucesso!");
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

// export class AuthController {
//   async signup(req: Request, res: Response) {
//     const { email, nome, senha, tipo } = req.body;

//     try {
//       const result = await userService.createUser({ email, nome, senha, tipo });
//       res.status(201).json(result);
//       console.log("User created");
//     } catch (error) {
//       res.status(400).json({ error: (error as Error).message });
//     }
//   }

//   async login(req: Request, res: Response) {
//     const { email, senha } = req.body;

//     try {
//       const result = await userService.loginUser(email, senha);
//       res.status(200).json(result);
//       console.log("User logged in");
//     } catch (error) {
//       res.status(500).json({ error: (error as Error).message });
//     }
//   }
// }
