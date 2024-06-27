import express from "express";

import { authMiddleware } from "../middleware/auth.middleware";
import { LecturesController } from "../controllers/lectures.controller";
import multer from "multer";

const lecturesRouter = express.Router();

lecturesRouter.get("/:id", authMiddleware, LecturesController.getLecture);
lecturesRouter.put("/", authMiddleware, LecturesController.updateLecture);
lecturesRouter.patch("/:id", authMiddleware, LecturesController.deleteLecture);

const fileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./files");
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
})

lecturesRouter.post("/", authMiddleware, multer({storage: fileStorage}).array("files", 5), LecturesController.addLecture);


export { lecturesRouter };