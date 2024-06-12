import { Router } from "express";
import { AddPokemonController } from "../controllers/addPokemonToProfessorBackpack/addPokemonToProfessorBackpack";
import { ProfessorCreateCourseController } from "../controllers/professorCreateCourse/professorCreateCourse";
import { ProfessorCreateTestController } from "../controllers/professorCreateTest/professorCreateTest";
import { ProfessorCreateQuestionController } from "../controllers/professorCreateQuestion/professorCreateQuestion";

const router = Router();

router.post("/add-pokemon/", AddPokemonController.addPokemon);
router.post("/curso", (req, res) =>
  ProfessorCreateCourseController.createCourse(req, res)
);
router.post("/criar-prova", (req, res) =>
  ProfessorCreateTestController.professorCreateTest(req, res)
);
router.post("/criar-questao", (req, res) =>
  ProfessorCreateQuestionController.createQuestion(req, res)
);
// router.post('/corrigir-prova', ProfessorController.corrigirProva);

export default router;
