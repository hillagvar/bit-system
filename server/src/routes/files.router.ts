import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import multer from "multer";
import { FilesController } from "../controllers/files.controller";
import { editMiddleware } from "../middleware/edit.middleware";
import { ownFilesMiddleware } from "../middleware/own.files.middleware";
import path from "path";

const filesRouter = express.Router();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./files");
    },
    filename: (req, file, cb) => {
        const filename = new Date().toLocaleDateString("LT")+"_"+file.originalname;
        
        cb(null, filename);
    }
})

const upload = multer({
  storage: fileStorage,
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
}).array("files", 5);


function checkFileType(file: any, cb: any) {
  const filetypes = /jpeg|jpg|png|gif|doc|docx|pdf|ppt|pptx|xls|xlsx/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    
    return cb(new Error("Netinkamas failo tipas"));
  }
}


filesRouter.post("/add", authMiddleware, editMiddleware, function (req, res, next) {
    upload (req, res, function (error) {
        if (error) {
            res.status(400).json({
                "text": "Netinkamas failo tipas"
            })
        } else {
            next();
        }
    })
}, FilesController.addFile);
filesRouter.delete("/:id", authMiddleware, editMiddleware, ownFilesMiddleware, FilesController.deleteFile);
filesRouter.patch("/:id", authMiddleware, editMiddleware, ownFilesMiddleware, FilesController.changeFileVisibility);

export { filesRouter };