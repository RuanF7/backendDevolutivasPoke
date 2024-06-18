import { Router } from "express";
import { AddPokemonController } from "../controllers/addPokemonToProfessorBackpack/addPokemonToProfessorBackpack";
import { ProfessorCreateCourseController } from "../controllers/professorCreateCourse/professorCreateCourse";
import { ProfessorCreateTestController } from "../controllers/professorCreateTest/professorCreateTest";
import { ProfessorCreateQuestionController } from "../controllers/professorCreateQuestion/professorCreateQuestion";
import { ProfessorCorrectTestController } from "../controllers/professorCorrectTest/professorCorrectTest";

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
router.post("/corrigir-prova", (req, res) =>
  ProfessorCorrectTestController.correctTest(req, res)
);
router.get("/curso/:professorId", (req, res) =>
  ProfessorCreateCourseController.getCursoIdByProfessorId(req, res)
);
export default router;
