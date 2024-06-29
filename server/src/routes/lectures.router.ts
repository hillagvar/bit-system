import express from "express";

import { authMiddleware } from "../middleware/auth.middleware";
import { LecturesController } from "../controllers/lectures.controller";
import multer from "multer";
import { FilesController } from "../controllers/files.controller";

const lecturesRouter = express.Router();

lecturesRouter.get("/:id", authMiddleware, LecturesController.getLecture);
lecturesRouter.put("/", authMiddleware, LecturesController.updateLecture);
lecturesRouter.patch("/:id", authMiddleware, LecturesController.deleteLecture);
lecturesRouter.get("/:id/files", authMiddleware, FilesController.getFileList);

const fileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./files");
    },
    filename: (req, file, callback) => {
        // const uploadDate = new Date().toLocaleDateString("LT");
        // callback(null, uploadDate + "_" + file.originalname);
        callback(null, file.originalname);
    }
})

lecturesRouter.post("/", authMiddleware, multer({storage: fileStorage}).array("files", 5), LecturesController.addLecture);

lecturesRouter.post("/:id/files/add", authMiddleware, multer({storage: fileStorage}).array("files", 5), FilesController.addFile);


export { lecturesRouter };