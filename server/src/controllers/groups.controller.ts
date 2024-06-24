import { pool } from "../db/connect";
import { Group } from "../models/group";
import { Lecture } from "../models/lecture";

export class GroupController {
    static async getGroups(req: any, res: any) {
        const sql = "SELECT * FROM users LEFT JOIN users_groups on users_groups.user_id = users.id LEFT JOIN groups ON users_groups.group_id = groups.id WHERE (users.id = ? AND groups.deleted IS NULL)";
        const [result] = await pool.query<Group[]>(sql, [req.user.id]);

        res.json(result);
    }

    static async getGroup() {

    }

    static async addGroup(req: any, res: any) {
        if (req.body.name == "") {
            return res.status(400).json({
                "text": "Neįvestas pavadinimas"
            });
        }

        const sql = "INSERT INTO groups (name, start, end, course_id, lecturer_id) VALUES (?,?,?,?,?)";

        try {
            await pool.query(sql, [req.body.name, req.body.start, req.body.end, req.body.course, req.body.lecturer]);
            
            res.json({
                "success" : true
            });
        } catch(error) {
            
            res.status(500).json({
                "text": "Įvyko pridėjimo klaida"
            });
        }
    }

    static async editGroup() {

    }

    static async deleteGroup(req: any, res: any) {
        const sql = "UPDATE groups SET deleted = ? WHERE (id = ?)";
         const [result] = await pool.query(sql, [req.body.deleted, req.params.id]);

         res.json({
            "success": true
         });


    }

    static async getLecturesByGroup(req: any, res: any) {

        const sql = "SELECT * FROM groups WHERE id = ?";
        const [result] = await pool.query<Group[]>(sql, [req.params.id]);

        if (result.length == 0) {
            return res.status(400).json({
                "text": "Tokia grupė neegzistuoja"
            })
        }

        const sql2 = "SELECT lectures.name as name, lectures.date as date, description FROM lectures LEFT JOIN groups ON groups.id = lectures.group_id WHERE groups.id =?";
        const [result2] = await pool.query<Lecture[]>(sql2, [req.params.id]);

        if (result2.length != 0) {
        
        const fixedResult = result2.map( lecture => {
            return {...lecture, date: lecture.date.toLocaleDateString("LT")};
        });

        res.json(fixedResult);

        } else {
           res.json(result2);
        }

    }

}