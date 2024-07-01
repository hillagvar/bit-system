import express from "express";

import { authMiddleware } from "../middleware/auth.middleware";
import { LecturesController } from "../controllers/lectures.controller";
import multer from "multer";
import { FilesController } from "../controllers/files.controller";
import { editMiddleware } from "../middleware/edit.middleware";
import { ownLectureMiddleware } from "../middleware/own.lecture.middleware";
import { viewLecturesMiddleware } from "../middleware/view.lectures.middleware";

const lecturesRouter = express.Router();

lecturesRouter.get("/:id", authMiddleware, editMiddleware, ownLectureMiddleware, LecturesController.getLecture);
lecturesRouter.put("/:id", authMiddleware, editMiddleware, ownLectureMiddleware, LecturesController.updateLecture);
lecturesRouter.patch("/:id", authMiddleware, editMiddleware, ownLectureMiddleware, LecturesController.deleteLecture);
lecturesRouter.get("/:id/files", authMiddleware, ownLectureMiddleware, viewLecturesMiddleware, FilesController.getFileList); 

const fileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./files");
    },
    filename: (req, file, callback) => {
        const filename = new Date().toLocaleDateString("LT")+"_"+file.originalname;
        
        callback(null, filename);
    }
})

lecturesRouter.post("/", authMiddleware, multer({storage: fileStorage}).array("files", 5), LecturesController.addLecture);

lecturesRouter.post("/:id/files/add", authMiddleware, multer({storage: fileStorage}).array("files", 5), FilesController.addFile);


export { lecturesRouter };