import express from "express";
import { GroupController } from "../controllers/groups.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { UserController } from "../controllers/user.controller";
import { StudentController } from "../controllers/student.controller";
import { editMiddleware } from "../middleware/edit.middleware";

const studentRouter = express.Router();

studentRouter.get("/groups", authMiddleware, GroupController.getGroupsByStudent);
studentRouter.delete("/groups/:id", authMiddleware, StudentController.deleteStudentFromGroup);
studentRouter.get("/profile/:id", authMiddleware, UserController.getUser);
studentRouter.put("/profile/:id", authMiddleware, UserController.updateUser);
studentRouter.get("/all", authMiddleware, editMiddleware, StudentController.getAllStudents);

export { studentRouter };