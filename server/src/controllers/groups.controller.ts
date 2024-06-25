import { pool } from "../db/connect";
import { Group, ResultCoursesUsers } from "../models/group";
import { Lecture } from "../models/lecture";

export class GroupController {
    
    static async getGroups(req: any, res: any) {
        const sql = "SELECT groups.name, groups.start, groups.end, groups.id, courses.id as courseId FROM users LEFT JOIN users_groups on users_groups.user_id = users.id LEFT JOIN groups ON users_groups.group_id = groups.id LEFT JOIN courses on courses.id = groups.course_id WHERE (users.id = ? AND groups.deleted IS NULL)";
        const [result] = await pool.query<Group[]>(sql, [req.user.id]);

        for(let i=0; i < result.length; i++) {
            const sql2 = "SELECT users.id as id, users.name as name, users.surname as surname FROM courses LEFT JOIN users ON courses.lecturer_id = users.id WHERE courses.id = ?";

            const [lecturer] = await pool.query<ResultCoursesUsers[]>(sql2, [result[i].courseId]);
            result[i].lecturer = lecturer[0];
        }

        if (result.length != 0) {
        
        const fixedResult = result.map( group => {
            return {...group, start: group.start.toLocaleDateString("LT"), end: group.end.toLocaleDateString("LT")};
        });

        // console.log(fixedResult);

        res.json(fixedResult);

        } else {
           res.json(result);
        }
    }

      static async getGroup(req: any, res: any) {
        const sql = "SELECT * FROM groups WHERE id=? AND deleted IS NULL";
        const [result] = await pool.query<Group[]>(sql, [req.params.id]);

        if (result.length == 0) {
            res.status(404).json({
                "text": "Tokia grupė neegzistuoja"
            });
        } else {
            const fixedResult = result.map( group => {
            return {...group, start: group.start.toLocaleDateString("LT"), end: group.end.toLocaleDateString("LT"),};
        });

        res.json(fixedResult[0]);
    

        }
   
    }

    static async addGroup(req: any, res: any) {
        if (req.body.name == "") {
            return res.status(400).json({
                "text": "Neįvestas pavadinimas"
            });
        }

        const sql = "INSERT INTO groups (name, start, end, course_id) VALUES (?,?,?,?)";

        try {
            await pool.query(sql, [req.body.name, req.body.start, req.body.end, req.body.course]);
            
            res.json({
                "success" : true
            });
        } catch(error) {
            
            res.status(500).json({
                "text": "Įvyko pridėjimo klaida"
            });
        }
    }

    static async updateGroup(req: any, res: any){
        const sql = "UPDATE groups SET name=?, start=?, end=?, course_id=? WHERE id=?";

        try {
            await pool.query(sql, [req.body.name, req.body.start, req.body.end, req.body.course, req.body.id]);
            res.json({
                "success" : true
            });
        } catch(error) {
            
            res.status(500).json({
                "text": "Įvyko atnaujinimo klaida"
            });
        }
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