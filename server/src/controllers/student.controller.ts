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
        const sql = "INSERT INTO users_groups (user_id, group_id) VALUES (?,?)";

        try {
            const [result] = await pool.query(sql, [req.body.student, req.params.id]);
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