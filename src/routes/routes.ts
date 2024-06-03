import { Router } from 'express';
import { getPokemon } from '../controllers/controller';

const router: Router = Router();

router.get('/:name', getPokemon);

export default router;