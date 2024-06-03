import { Router } from 'express';
import { createProva } from '../controllers/provaController';

const router = Router();

router.post('/create', createProva);

export default router;