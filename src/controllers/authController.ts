import { Request, Response } from 'express';
import { UserService } from '../services/userService';

const userService = new UserService();

export class AuthController {
  async signup(req: Request, res: Response) {
    const { nome, email, senha, tipo, isProfessor } = req.body;

    try {
      const result = await userService.createUser({ nome, email, senha, tipo, isProfessor });
      res.status(201).json(result);
      console.log('User created');
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async login(req: Request, res: Response) {
    const { email, senha } = req.body;

    try {
      const result = await userService.loginUser(email, senha);
      res.status(200).json(result); 
      console.log('User logged in');
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
