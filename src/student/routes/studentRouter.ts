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
router.get("/cursos", (req, res) =>
  RegisterStudentController.listCourses(req, res)
);
router.get(
  "/provas-disponiveis/:alunoId",
  StudentTestAnswerController.getAvailableTests
);
router.get("/:provaId/questoes", StudentTestAnswerController.getQuestoes);

export default router;
