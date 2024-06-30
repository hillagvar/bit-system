import { pool } from "../db/connect";
import { Course } from "../models/course";

const ownCourseMiddleware = async (req:any, res:any, next:any) => {
    try {
    const sql = "SELECT * FROM courses LEFT JOIN users ON courses.lecturer_id = users.id WHERE (users.id = ? AND courses.id =?)";
    const sql2 = "SELECT * FROM courses WHERE id = ?";
    const [result] = await pool.query<Course[]>(sql, [req.user.id, req.params.id]);
    const [result2] = await pool.query<Course[]>(sql2, [req.params.id]);

    if (result2.length == 0) {
        return res.status(401).json({
            "text": "Toks kursas neegzistuoja"
        });
        } else if (result2.length != 0 && result.length == 0 ) {
            return res.status(401).json({
            "text": "Neturite priėjimo prie šio kurso"
            });
        } else {
            next();
            }
    } catch(error) {
        return res.status(500).json({
            "text": "Įvyko klaida"
            });
        } 
};

export { ownCourseMiddleware };