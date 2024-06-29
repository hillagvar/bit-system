import { pool } from "../db/connect";
import { Group } from "../models/group";

const ownGroupMiddleware = async (req:any, res:any, next:any) => {
    const sql = "SELECT * FROM groups LEFT JOIN courses ON groups.course_id = courses.id LEFT JOIN users ON courses.lecturer_id = users.id WHERE (users.id = ? AND groups.id =?)";
    const sql2 = "SELECT * FROM groups WHERE id = ?";
    const [result] = await pool.query<Group[]>(sql, [req.user.id, req.params.id]);
    const [result2] = await pool.query<Group[]>(sql2, [req.params.id]);

    if (req.user.type == 1 && result2.length == 0) {
        return res.status(401).json({
            "text": "Tokia grupė neegzistuoja"
        }) 

    } else if (req.user.type == 1 && result2.length != 0 && result.length == 0 ) {
        return res.status(401).json({
            "text": "Neturite priėjimo prie šios grupės"
        })
    } else {
        next();
    }
 {}
    
};


export { ownGroupMiddleware };