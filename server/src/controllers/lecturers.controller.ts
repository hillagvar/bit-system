import { pool } from "../db/connect";
import { User } from "../models/user";

export class LecturersController {
    static async getLecturer(req: any, res: any) {
        
        const sql = "SELECT * FROM users WHERE id = ?";
        const [result] = await pool.query<User[]>(sql, [req.user.id]);

        res.json(result[0]);
    }

}