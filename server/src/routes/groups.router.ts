import express from "express";
import { GroupController } from "../controllers/groups.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { viewLecturesMiddleware } from "../middleware/view.lectures.middleware";

const groupsRouter = express.Router();

groupsRouter.get("/:id/lectures", authMiddleware, viewLecturesMiddleware, GroupController.getLecturesByGroup);
groupsRouter.get("/:id", authMiddleware, viewLecturesMiddleware, GroupController.getGroup);
groupsRouter.patch("/:id", authMiddleware, GroupController.deleteGroup); //reika dar middleware, kad galetu editinti tik destytojas
groupsRouter.post("/", authMiddleware, GroupController.addGroup);
groupsRouter.put("/", authMiddleware, GroupController.updateGroup);
groupsRouter.get("/", authMiddleware, GroupController.getGroupsByLecturer);

export { groupsRouter };
