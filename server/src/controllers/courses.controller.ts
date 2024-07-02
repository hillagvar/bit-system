import { pool } from "../db/connect";
import { Course } from "../models/course";
import { Group } from "../models/group";

export class CoursesController {
    static async getCourses(req: any, res: any) {
        try {
        const sql = "SELECT courses.name as name, courses.id, deleted FROM courses LEFT JOIN users on users.id = courses.lecturer_id WHERE users.id =? AND deleted IS NULL";
        const [result] = await pool.query<Course[]>(sql, [req.user.id]);
        res.json(result);
        } catch(error) {
            res.status(500).json({
                "text": "Įvyko klaida"
            });
        }
    }

    static async getCourse(req: any, res: any) {
        const sql = "SELECT * FROM courses WHERE id=? AND deleted IS NULL";
        const [result] = await pool.query<Course[]>(sql, [req.params.id]);

        if (result.length == 0) {
            res.status(404).json({
                "text": "Toks kursas neegzistuoja"
            });

        } else {
            res.json(result[0]);
        } 
    }

    static async addCourse(req: any, res: any) {
        if (req.body.name == "") {
            return res.status(400).json({
                "text": "Neįvestas pavadinimas"
            });
        }

        const sql = "INSERT INTO courses (name, lecturer_id) VALUES (?, ?)";

        try {
            await pool.query(sql, [req.body.name, req.user.id]);
            
            res.json({
                "success" : true
            });
        } catch(error) {
            
            res.status(500).json({
                "text": "Įvyko pridėjimo klaida"
            });
        }
    }

    static async updateCourse(req: any, res: any){
        const sql = "UPDATE courses SET name=? WHERE id=?";

         if (req.body.name == "") {
            return res.status(400).json({
                "text": "Neįvestas pavadinimas"
            });
        }

        try {
            await pool.query(sql, [req.body.name, req.body.id]);
            res.json({
                "success" : true
            });
        } catch(error) {
            
            res.status(500).json({
                "text": "Įvyko atnaujinimo klaida"
            });
        }
    }

    static async deleteCourse(req: any, res: any) {
        const sql = "UPDATE courses SET deleted = ? WHERE id = ?";
         const [result] = await pool.query(sql, [req.body.deleted, req.params.id]);

         res.json({
            "success": true
         });
    }

    static async getGroupsByCourse(req: any, res: any) {
        let sql = "SELECT * FROM courses WHERE courses.id =? AND deleted IS NULL";
        let [result] = await pool.query<Course[]>(sql, [req.params.id]);

        if (result.length == 0) {
            return res.status(400).json({
                "text": "Toks kursas neegzistuoja"
            })
        }

        sql = "SELECT groups.id as id, groups.name as name, start, end FROM groups LEFT JOIN courses ON courses.id = groups.course_id LEFT JOIN users ON courses.lecturer_id = users.id WHERE (courses.id = ? AND groups.deleted IS NULL)";
        [result] = await pool.query<Group[]>(sql, [req.params.id]);

        if (result.length != 0) {
            const fixedResult = result.map( group => {
            return {...group, start: group.start.toLocaleDateString("LT"), end: group.end.toLocaleDateString("LT")};
        });

        res.json(fixedResult);

        } else {
            res.json(result);

        }
        

    }
}