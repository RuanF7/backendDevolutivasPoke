import express from "express";
import { StudentController } from "../controllers/alunoController";
// import { ProvaController } from "../controllers/provaController";

const router = express.Router();
const alunoController = new StudentController();
// const provaController = new ProvaController();

router.post("/matricular", (req, res) =>
  StudentController.registerStudent(req, res)
);
// router.post("/realizar-prova", (req, res) =>
//   alunoController.realizarProva(req, res)
// );
// router.post("/criar-devolutiva", (req, res) =>
//   provaController.criarDevolutiva(req, res)
// );

export default router;
