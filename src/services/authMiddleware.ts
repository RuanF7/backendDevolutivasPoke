import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Definição da interface estendida do Request
interface AuthenticatedRequest extends Request {
  userId?: string; // Adicione a propriedade userId ao Request
}

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    // Adicione o ID do usuário à requisição
    req.userId = userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};
