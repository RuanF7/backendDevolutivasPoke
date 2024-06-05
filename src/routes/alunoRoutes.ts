import express from 'express';
import { AlunoController } from '../controllers/alunoController';
import { ProvaController } from '../controllers/provaController';

const router = express.Router();
const alunoController = new AlunoController();
const provaController = new ProvaController();

router.post('/matricular', (req, res) => alunoController.matricularAluno(req, res));
router.post('/realizar-prova', (req, res) => alunoController.realizarProva(req, res));
router.post('/criar-devolutiva', (req, res) => provaController.criarDevolutiva(req, res));

export default router;
