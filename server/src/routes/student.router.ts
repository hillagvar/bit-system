import express from "express";
import { GroupController } from "../controllers/groups.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { userController } from "../controllers/user.controller";

const studentRouter = express.Router();

studentRouter.get("/groups", authMiddleware, GroupController.getGroupsByStudent);
studentRouter.get("/profile/:id", authMiddleware, userController.getUser);
studentRouter.put("/profile/:id", authMiddleware, userController.updateUser);

export { studentRouter };