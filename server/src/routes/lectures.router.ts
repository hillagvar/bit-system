import express from "express";

import { authMiddleware } from "../middleware/auth.middleware";
import { LecturesController } from "../controllers/lectures.controller";

const lecturesRouter = express.Router();

lecturesRouter.post("/", authMiddleware, LecturesController.addLecture);
lecturesRouter.get("/:id", authMiddleware, LecturesController.getLecture);
lecturesRouter.put("/", authMiddleware, LecturesController.updateLecture);
lecturesRouter.patch("/:id", authMiddleware, LecturesController.deleteLecture);


export { lecturesRouter };