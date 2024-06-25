import express from "express";
import { CoursesController } from "../controllers/courses.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { viewLecturesMiddleware } from "../middleware/view.lectures.middleware";

const coursesRouter = express.Router();

coursesRouter.get("/", authMiddleware, CoursesController.getCourses);
coursesRouter.get("/:id", authMiddleware, CoursesController.getCourse);
coursesRouter.post("/", authMiddleware, CoursesController.addCourse);
coursesRouter.put("/", authMiddleware, CoursesController.updateCourse);
coursesRouter.patch("/:id", authMiddleware, CoursesController.deleteCourse);
coursesRouter.get("/:id/groups", authMiddleware, viewLecturesMiddleware, CoursesController.getGroupsByCourse);

export { coursesRouter };
