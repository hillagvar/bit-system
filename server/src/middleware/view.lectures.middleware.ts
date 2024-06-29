import { pool } from "../db/connect";
import { Group } from "../models/group";

const viewLecturesMiddleware = async (req:any, res:any, next:any) => {
    const sql = "SELECT * from lectures LEFT JOIN groups ON lectures.group_id = groups.id LEFT JOIN users_groups on users_groups.group_id = groups.id LEFT JOIN users on users_groups.user_id = users.id WHERE (users.id = ? and lectures.id = ?)";
    const sql2 = "SELECT * FROM lectures WHERE id = ?";
    const [result] = await pool.query<Group[]>(sql, [req.user.id, req.params.id]);
    const [result2] = await pool.query<Group[]>(sql2, [req.params.id]);

    if (req.user.type == 2 && result2.length == 0) {
        return res.status(401).json({
            "text": "Tokia paskaita neegzistuoja"
        }) 

    } else if (req.user.type == 2 && result2.length != 0 && result.length == 0 ) {
        return res.status(401).json({
            "text": "Nesate priregistruotas prie šios paskaitos"
        })
    } else {
        next();
    }
 {}
    
};


export { viewLecturesMiddleware };