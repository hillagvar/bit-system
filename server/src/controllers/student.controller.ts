import { pool } from "../db/connect";
import { User } from "../models/user";

export class StudentController {
    static async getStudentsByGroup(req: any, res: any) {
        const sql = "SELECT users.name as name, users.surname as surname, users_groups.id as pairId FROM groups LEFT JOIN users_groups ON users_groups.group_id = groups.id LEFT JOIN users ON users_groups.user_id = users.id WHERE groups.id = ?";

        try {
            const [result] = await pool.query<User[]>(sql, [req.params.id]);
            res.json(result);
        } catch(error) {   
            res.status(500).json({
                "text": "Įvyko klaida"
            });
        }
    }

    static async getAllStudents(req: any, res: any ) {
        const sql = "SELECT * FROM users WHERE type = 2";

        try {
            const [result] = await pool.query<User[]>(sql);
            res.json(result);
        } catch(error) {   
            res.status(500).json({
                "text": "Įvyko klaida"
            });
        }
    }

    static async addStudentToGroup(req: any, res: any) {

        const sql1 = "SELECT * FROM users_groups WHERE (user_id =? AND group_id =?)";
        const [result1] = await pool.query<any>(sql1, [req.body.student, req.params.id]);
        
        if (result1.length != 0) {
            return res.status(400).json({
                "text": "Toks studentas grupėje jau yra"
            });
        }

        const sql2 = "INSERT INTO users_groups (user_id, group_id) VALUES (?,?)";

        try {
            const [result2] = await pool.query(sql2, [req.body.student, req.params.id]);
            res.json({
                "success" : true
            });
        } catch(error) {   
            res.status(500).json({
                "text": "Įvyko pridėjimo klaida"
            });
        }
    }

    static async deleteStudentFromGroup(req: any, res: any) {
        const sql = "DELETE FROM users_groups WHERE id = ?";

        try {
            const [result] = await pool.query(sql, [req.params.id]);
            res.json({
                "success" : true
            });
        } catch(error) {   
            res.status(500).json({
                "text": "Įvyko klaida"
            });
        }

    }
}