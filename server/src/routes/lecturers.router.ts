import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { LecturersController } from "../controllers/lecturers.controller";

const lecturersRouter = express.Router();

lecturersRouter.get("/", authMiddleware, LecturersController.getLecturer);

export { lecturersRouter };