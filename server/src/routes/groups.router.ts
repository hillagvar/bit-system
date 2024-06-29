import express from "express";
import { GroupController } from "../controllers/groups.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { viewGroupsMiddleware } from "../middleware/view.groups.middleware";
import { editMiddleware } from "../middleware/edit.middleware";
import { ownGroupMiddleware } from "../middleware/own.group.middleware";

const groupsRouter = express.Router();

groupsRouter.get("/:id/lectures", authMiddleware, viewGroupsMiddleware, ownGroupMiddleware, GroupController.getLecturesByGroup);
groupsRouter.get("/:id", authMiddleware, editMiddleware, ownGroupMiddleware, GroupController.getGroup);
groupsRouter.patch("/:id", authMiddleware, editMiddleware, ownGroupMiddleware, GroupController.deleteGroup); 
groupsRouter.post("/", authMiddleware, editMiddleware, GroupController.addGroup);
groupsRouter.put("/", authMiddleware, editMiddleware, ownGroupMiddleware, GroupController.updateGroup);
groupsRouter.get("/", authMiddleware, editMiddleware, GroupController.getGroupsByLecturer);

export { groupsRouter };
