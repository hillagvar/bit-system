import { pool } from "../db/connect";
import bcrypt from "bcrypt";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export class AuthController {
    static async signUp (req: any, res: any) {
        const name = req.body.name;
        const surname = req.body.surname;
        const phone = req.body.phone;
        const email = req.body.email;
        const type = 1;
        let password: string = req.body.password;

         password = await bcrypt.hash(password, 12);

        

        let sql = "SELECT * FROM users WHERE email LIKE ?";
        const [result] = await pool.query<User[]>(sql, [email]);

        if (result.length != 0) {
            return res.status(400).json({
                "text": "Vartotojas su tokiu el.paštu jau registruotas."
            })
        }

        sql = "INSERT INTO users (name, surname, email, phone, password, type) VALUES (?, ?, ?, ?, ?, ?)";
        await pool.query(sql, [name, surname, email, phone, password, type]);

        res.json({
            "status": "Ok"
        });
    }

    static async login(req: any, res: any) {
        const email = req.body.email;
        const password: string = req.body.password;

        const sql = "SELECT * FROM users WHERE email like ?";
        const [result] = await pool.query<User[]>(sql, [email]);

        if (result.length != 1) {
            return res.status(400).json({
                "text": "Vartotojas su tokiu el.paštu neegzistuoja."
            });
        }

        const user = result[0];
       
        let passwordOk = await bcrypt.compare(password, user.password);

        if (!passwordOk) {
            return res.status(400).json({
                "text": "Neteisingi prisijungimo duomenys."
            });
        }


        if (process.env.TOKEN_SECRET != null) {
            dotenv.config();

            let token = jwt.sign(
            {
            "id": user.id
            },
        process.env.TOKEN_SECRET, 
        {
            expiresIn: "1 day"
        });

        
        res.json({
            "id": user.id,
            "email": user.email,
            "token": token,
            "type": user.type
        });
        }
 
    }
}