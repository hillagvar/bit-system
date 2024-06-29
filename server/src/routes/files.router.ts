import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import multer from "multer";
import { FilesController } from "../controllers/files.controller";

const filesRouter = express.Router();

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

filesRouter.post("/add", authMiddleware, multer({storage: fileStorage}).array("files", 5), FilesController.addFile);
filesRouter.delete("/:id", authMiddleware, FilesController.deleteFile);
filesRouter.patch("/:id", authMiddleware, FilesController.hideFile);

export { filesRouter };