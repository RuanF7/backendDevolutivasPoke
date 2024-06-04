import express from 'express';
import { AlunoController } from '../controllers/alunoController';

const router = express.Router();
const alunoController = new AlunoController();

router.post('/matricular', (req, res) => alunoController.matricularAluno(req, res));
router.post('/realizar-prova', (req, res) => alunoController.realizarProva(req, res));

export default router;
