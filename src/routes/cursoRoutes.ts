import express, { Request, Response } from 'express';
import { CursoController } from '../controllers/cursoController';

const router = express.Router();
const cursoController = new CursoController();

router.post('/curso', (req: Request, res: Response) => cursoController.criarCurso(req, res));
router.get('/curso', (req: Request, res: Response) => cursoController.listarCursos(req, res));

export default router;
