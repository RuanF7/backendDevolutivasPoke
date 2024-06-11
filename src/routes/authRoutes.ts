import { Router } from "express";
import { AuthController } from "../controllers/authController";

const router = Router();
const authController = new AuthController();

router.post("/signup", (req, res) => authController.signUp(req, res));
router.post("/login", (req, res) => authController.login(req, res));

export default router;
