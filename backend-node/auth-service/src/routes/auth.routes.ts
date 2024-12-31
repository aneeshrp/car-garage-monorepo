import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
const router: Router = Router();

router.post('/login', login);
router.post('/register', register);

export default router;