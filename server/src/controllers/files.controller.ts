import path from "path";
import { pool } from "../db/connect";
import { LectureFile } from "../models/lectureFile";
import fs from 'fs';

export class FilesController {
    static async getFileList(req: any, res: any) {

    if (req.user.type == 2) {
        const sql = "SELECT * FROM files WHERE (lecture_id =? AND hidden = 1)";
        const [result] = await pool.query<LectureFile[]>(sql, [req.params.id]);
        res.json(result);
    } else {
        const sql = "SELECT * FROM files WHERE lecture_id =?";
        const [result] = await pool.query<LectureFile[]>(sql, [req.params.id]);
        res.json(result);
    }

    }

    static async addFile(req: any, res: any) {

        const lectureId = Number(req.body.lectureId);
        const files = req.files;

        files.forEach(async (file: any) => {
            const url = req.protocol+"://"+req.get("host")+"/files/"+file.filename ;
            const sql = "INSERT INTO files (url, lecture_id, name) VALUES (?,?,?)";
            await pool.query(sql, [url, lectureId, file.filename]);
        });
        
         res.json({
            "status": "Ok"
        }) 
    }

    static async deleteFile(req: any, res: any) {
        const [fileToDelete] = await pool.query<LectureFile[]>("SELECT * FROM files WHERE id = ?", [req.params.id]);

        fs.unlinkSync(path.join('./files/'+fileToDelete[0].name.split('/').pop()));

        const sql = "DELETE FROM files WHERE id =?";
        await pool.query(sql, [req.params.id]);

        res.json({
            "status": "Ok"
        }) 
    }



    static async changeFileVisibility(req: any, res: any) {

        const sql = "UPDATE files SET hidden = ? WHERE id = ?";
        await pool.query(sql, [req.body.hidden, req.params.id]);

         res.json({
            "status": "Ok"
        }) 
    }

 
}