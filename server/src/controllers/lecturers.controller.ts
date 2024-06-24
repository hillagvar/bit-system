import { pool } from "../db/connect";
import { User } from "../models/user";

export class LecturersController {
    static async getLecturers(req: any, res: any) {
        
        const sql = "SELECT * FROM users WHERE type = 1";
        const [result] = await pool.query<User[]>(sql);

        res.json(result);
    }

}