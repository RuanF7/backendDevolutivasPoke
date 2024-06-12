import { Router } from "express";
import { RegisterStudentController } from "../controllers/registerStudentToCourse/registerStudentToCourse";
import { StudentTestAnswerController } from "../controllers/studentTestAnswers/studentTestAnswers";
const router = Router();

router.post("/matricular", (req, res) =>
  RegisterStudentController.registerStudent(req, res)
);
router.post("/responder-prova", (req, res) =>
  StudentTestAnswerController.createAnswer(req, res)
);
// router.post("/realizar-prova", (req, res) =>
//   alunoController.realizarProva(req, res)
// );
// router.post("/criar-devolutiva", (req, res) =>
//   provaController.criarDevolutiva(req, res)
// );

export default router;
