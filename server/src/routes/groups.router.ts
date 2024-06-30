import express from "express";
import { GroupController } from "../controllers/groups.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { viewGroupsMiddleware } from "../middleware/view.groups.middleware";
import { editMiddleware } from "../middleware/edit.middleware";
import { ownGroupMiddleware } from "../middleware/own.group.middleware";
import { StudentController } from "../controllers/student.controller";

const groupsRouter = express.Router();

groupsRouter.get("/:id/lectures", authMiddleware, viewGroupsMiddleware, ownGroupMiddleware, GroupController.getLecturesByGroup);
groupsRouter.get("/:id/students", authMiddleware, editMiddleware, ownGroupMiddleware, StudentController.getStudentsByGroup);
groupsRouter.post("/:id/students/add", authMiddleware, editMiddleware, ownGroupMiddleware, StudentController.addStudentToGroup);
groupsRouter.get("/:id", authMiddleware, editMiddleware, ownGroupMiddleware, GroupController.getGroup);
groupsRouter.patch("/:id", authMiddleware, editMiddleware, ownGroupMiddleware, GroupController.deleteGroup); 
groupsRouter.post("/", authMiddleware, editMiddleware, GroupController.addGroup);
groupsRouter.put("/:id", authMiddleware, editMiddleware, ownGroupMiddleware, GroupController.updateGroup);
groupsRouter.get("/", authMiddleware, editMiddleware, GroupController.getGroupsByLecturer);

export { groupsRouter };
