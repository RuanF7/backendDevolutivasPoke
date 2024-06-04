import { Router } from 'express';
import { ProfessorController } from '../controllers/professorController';

const router = Router();

router.post('/add-pokemon', ProfessorController.addPokemonToMochila);
router.post('/create-prova', ProfessorController.createProva);
router.post('/corrigir-prova', ProfessorController.corrigirProva);

export default router;
