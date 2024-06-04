import express from 'express';
import ProvaController from '../controllers/provaController';

const router = express.Router();

router.post('/prova', ProvaController.createProva);

export default router;
