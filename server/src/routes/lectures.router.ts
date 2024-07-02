import express from "express";

import { authMiddleware } from "../middleware/auth.middleware";
import { LecturesController } from "../controllers/lectures.controller";
import multer from "multer";
import { FilesController } from "../controllers/files.controller";
import { editMiddleware } from "../middleware/edit.middleware";
import { ownLectureMiddleware } from "../middleware/own.lecture.middleware";
import { viewLecturesMiddleware } from "../middleware/view.lectures.middleware";
import path from "path";

const lecturesRouter = express.Router();

lecturesRouter.get("/:id", authMiddleware, editMiddleware, ownLectureMiddleware, LecturesController.getLecture);
lecturesRouter.put("/:id", authMiddleware, editMiddleware, ownLectureMiddleware, LecturesController.updateLecture);
lecturesRouter.patch("/:id", authMiddleware, editMiddleware, ownLectureMiddleware, LecturesController.deleteLecture);
lecturesRouter.get("/:id/files", authMiddleware, ownLectureMiddleware, viewLecturesMiddleware, FilesController.getFileList); 

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

lecturesRouter.post("/", authMiddleware, function (req, res, next) {
    upload (req, res, function (error) {
        if (error) {
            res.status(400).json({
                "text": "Netinkamas failo tipas"
            })
        } else {
            next();
        }
    })
}, LecturesController.addLecture);

// lecturesRouter.post("/:id/files/add", authMiddleware, multer({storage: fileStorage}).array("files", 5), FilesController.addFile);


export { lecturesRouter };