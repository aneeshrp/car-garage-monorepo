import { Router } from "express";
import {registerUser} from "../controllers/authController";
import { validateSignUp } from "../middlewares/validateRequest";

const router = Router();

router.post('/register', validateSignUp , registerUser);

export default router;