import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import multer from "multer";
import { FilesController } from "../controllers/files.controller";
import { editMiddleware } from "../middleware/edit.middleware";
import { ownFilesMiddleware } from "../middleware/own.files.middleware";

const filesRouter = express.Router();

const fileStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./files");
    },
    filename: (req, file, callback) => {
        const filename = new Date().toLocaleDateString("LT")+"_"+file.originalname;
        
        callback(null, filename);
    }
})

filesRouter.post("/add", authMiddleware, editMiddleware, multer({storage: fileStorage}).array("files", 5), FilesController.addFile);
filesRouter.delete("/:id", authMiddleware, editMiddleware, ownFilesMiddleware, FilesController.deleteFile);
filesRouter.patch("/:id", authMiddleware, editMiddleware, ownFilesMiddleware, FilesController.changeFileVisibility);

export { filesRouter };