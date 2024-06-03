import { Router } from 'express';
import { ProfessorController } from '../controllers/professorController';

const router = Router();

router.post('/add-pokemon', ProfessorController.addPokemonToMochila);
router.post('/create-prova', ProfessorController.createProva);

export default router;
