import express from "express";
import { AuthController } from "../controllers/auth.controller";
import { editMiddleware } from "../middleware/edit.middleware";
import { authMiddleware } from "../middleware/auth.middleware";

const authRouter = express.Router();

authRouter.post("/signup", AuthController.signUp);
authRouter.post("/login", AuthController.login);
authRouter.post("/register", authMiddleware, editMiddleware,AuthController.registerStudent); 

export { authRouter };

