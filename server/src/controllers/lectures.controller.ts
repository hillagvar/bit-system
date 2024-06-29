import { pool } from "../db/connect";
import { Lecture } from "../models/lecture";

export class LecturesController {

    static async addLecture(req: any, res: any) {
        const name = req.body.name;
        const date = req.body.date;
        const description = req.body.description;
        const groupId = Number(req.body.groupId);
        const files = req.files;

        const sql = "INSERT INTO lectures (name, date, description, group_id) VALUES (?,?,?,?)";
        const [result, fields] = await pool.query(sql, [name, date, description, groupId]);
        const insertId = (result as any).insertId;

        files.forEach(async (file: any) => {
            const url = req.protocol+"://"+req.get("host")+"/files/"+file.filename ;
            const sql2 = "INSERT INTO files (url, lecture_id, name) VALUES (?,?,?)";
            await pool.query(sql2, [url, insertId, file.filename]);
        });

        res.json({
            "status": "Ok"
        })

        // try {
        //     await pool.query(sql, [req.body.name, req.body.date, req.body.description, req.body.group]);
            
        //     res.json({
        //         "success" : true
        //     });
        // } catch(error) {
        //     res.status(500).json({
        //         "text": "Įvyko pridėjimo klaida"
        //     });
        // }

       
    }

    static async getLecture(req: any, res: any) {
        const sql = "SELECT lectures.id as id, lectures.name as name, date, description, group_id as groupId, course_id as courseId FROM lectures LEFT JOIN groups ON lectures.group_id = groups.id LEFT JOIN courses ON groups.course_id = courses.id WHERE lectures.id=? AND lectures.deleted IS NULL";
        const [result] = await pool.query<Lecture[]>(sql, [req.params.id]);

        if (result.length == 0) {
            res.status(404).json({
                "text": "Tokia paskaita neegzistuoja"
            });
        } else {
            const fixedResult = result.map( lecture => {
            return {...lecture, date: lecture.date.toLocaleDateString("LT")};
        });

        res.json(fixedResult[0]);
    
        }
    }

    static async updateLecture(req: any, res: any){
        const sql = "UPDATE lectures SET name=?, date=?, description=?, group_id=? WHERE id=?";

        try {
            await pool.query(sql, [req.body.name, req.body.date, req.body.description, req.body.group, req.body.id]);
            res.json({
                "success" : true
            });
        } catch(error) {
            
            res.status(500).json({
                "text": "Įvyko atnaujinimo klaida"
            });
        }
    }

    static async deleteLecture(req: any, res: any) {
        const sql = "UPDATE lectures SET deleted = ? WHERE id = ?";
         const [result] = await pool.query(sql, [req.body.deleted, req.params.id]);

         res.json({
            "success": true
         });

    }
}


