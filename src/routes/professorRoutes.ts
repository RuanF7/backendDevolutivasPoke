import { Router } from 'express';
import { ProfessorController } from '../controllers/professorController';

const router = Router();
const professorController = new ProfessorController();

router.post('/add-pokemon', (req, res) => professorController.addPokemon(req, res));
router.post('/create-prova', (req, res) => professorController.createProva(req, res));

export default router;
