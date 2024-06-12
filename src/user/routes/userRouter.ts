import { Router } from "express";
import { CreateUserController } from "../controllers/createUser/createUser";
import { UserLoginController } from "../controllers/userLogin/userLogin";

const router = Router();
const createUserController = new CreateUserController();
const userLoginController = new UserLoginController();

router.post("/signup", (req, res) => createUserController.signUp(req, res));
router.post("/login", (req, res) => userLoginController.login(req, res));

export default router;
