import express from "express";
import { CoursesController } from "../controllers/courses.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { viewLecturesMiddleware } from "../middleware/view.lectures.middleware";
import { ownCourseMiddleware } from "../middleware/own.course.middleware";
import { editMiddleware } from "../middleware/edit.middleware";
import { ownGroupMiddleware } from "../middleware/own.group.middleware";

const coursesRouter = express.Router();

coursesRouter.get("/", authMiddleware, editMiddleware, CoursesController.getCourses);
coursesRouter.get("/:id", authMiddleware, editMiddleware, ownCourseMiddleware, CoursesController.getCourse);
coursesRouter.post("/", authMiddleware, editMiddleware, CoursesController.addCourse);
coursesRouter.put("/", authMiddleware, editMiddleware, CoursesController.updateCourse);
coursesRouter.patch("/:id", authMiddleware, editMiddleware, ownCourseMiddleware, CoursesController.deleteCourse);
coursesRouter.get("/:id/groups", authMiddleware, viewLecturesMiddleware, ownCourseMiddleware, CoursesController.getGroupsByCourse);

export { coursesRouter };
