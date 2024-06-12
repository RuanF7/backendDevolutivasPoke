import { Router } from "express";
import { AddPokemonController } from "../controllers/addPokemonToProfessorBackpack/addPokemonToProfessorBackpack";

const router = Router();

router.post("/add-pokemon/", AddPokemonController.addPokemon);
// router.post('/corrigir-prova', ProfessorController.corrigirProva);

export default router;
