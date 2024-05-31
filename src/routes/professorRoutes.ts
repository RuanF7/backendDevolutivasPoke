import { Router } from 'express';
import { ProfessorController } from '../controllers/professorController';

const router = Router();

router.post('/add-pokemon', ProfessorController.addPokemonToMochila);

export default router;