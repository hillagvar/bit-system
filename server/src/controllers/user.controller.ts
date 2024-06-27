import { pool } from "../db/connect";
import { User } from "../models/user";

export class userController {
    static async getUser(req: any, res: any) {

        const userId = req.params.id;

        if (userId != req.user.id) {
            res.status(400).json({
                "text": "Neturite teisės redaguoti"
            })
        }

        const sql = "SELECT * FROM users WHERE id = ?";
        const [result] = await pool.query<User[]>(sql, [userId]);
        if (result.length == 0) {
            res.status(404).json({
                "text": "Vartotojas nerastas"
            });
        } else {
            res.json(result[0]);
        }
    }

    static async updateUser (req: any, res: any) {
       
        const userId = req.params.id;

        if (userId != req.user.id) {
            return res.status(400).json({
                "text": "Neturite teisės redaguoti"
            })
        }

        let sql = "SELECT * FROM users WHERE email LIKE ?";
        const [result] = await pool.query<User[]>(sql, [req.body.email]);

        if (result.length != 0 && result[0].id != req.body.id) {
            return res.status(400).json({
                "text": "Vartotojas su tokiu el.paštu jau registruotas"
            })
        }


       sql = "UPDATE users SET name=?, surname=?, phone=?, email=? WHERE id=?";

        try {
            await pool.query(sql, [req.body.name, req.body.surname, req.body.phone, req.body.email, req.body.id]);
            res.json({
                "success" : true
            });
        } catch(error) {      
            res.status(500).json({
                "text": "Įvyko atnaujinimo klaida"
            });
        }

    }
    
}