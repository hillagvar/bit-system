import express from "express";
import { GroupController } from "../controllers/groups.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const studentRouter = express.Router();

studentRouter.get("/groups", authMiddleware, GroupController.getGroups);

export { studentRouter };