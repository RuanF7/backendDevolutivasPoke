import { Router } from "express";
import { ProfessorController } from "../controllers/professorController";

const router = Router();

router.post("/add-pokemon/", ProfessorController.addPokemon);
// router.post('/corrigir-prova', ProfessorController.corrigirProva);

export default router;
