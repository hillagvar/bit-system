import { pool } from "../db/connect";
import { Lecture } from "../models/lecture";

export class LecturesController {

    static async addLecture(req: any, res: any) {
        if (req.body.name == "") {
            return res.status(400).json({
                "text": "Neįvestas pavadinimas"
            });

        
        }

        console.log(req.body);

        // const sql = "INSERT INTO lectures (name, date, description, group_id) VALUES (?,?,?,?)";

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


