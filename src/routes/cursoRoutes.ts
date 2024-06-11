import express, { Request, Response } from "express";
import { CourseController } from "../controllers/cursoController";

const router = express.Router();

router.post("/curso", (req: Request, res: Response) =>
  CourseController.createCourse(req, res)
);
// router.get("/curso", (req: Request, res: Response) =>
//   courseController.listarCursos(req, res)
// );

export default router;
