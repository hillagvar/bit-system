import { pool } from "../db/connect";
import { Course } from "../models/course";
import { Group } from "../models/group";

export class CoursesController {
    static async getCourses(req: any, res: any) {
        const sql = "SELECT * FROM courses";
        const [result] = await pool.query<Course[]>(sql);

        res.json(result);

    }

    static async getCourse() {

    }

    static async addCourse(req: any, res: any) {
        if (req.body.name == "") {
            return res.status(400).json({
                "text": "Neįvestas pavadinimas"
            });
        }

        const sql = "INSERT INTO courses (name) VALUES (?)";

        try {
            await pool.query(sql, [req.body.name]);
            
            res.json({
                "success" : true
            });
        } catch(error) {
            
            res.status(500).json({
                "text": "Įvyko pridėjimo klaida"
            });
        }
    }

    static async updateCourse() {

    }

    static async deleteCourse() {

    }

    static async getGroupsByCourse(req: any, res: any) {
        const sql = "SELECT * FROM courses WHERE courses.id =?";
        const [result] = await pool.query<Course[]>(sql, [req.params.id]);

        if (result.length == 0) {
            return res.status(400).json({
                "text": "Toks kursas neegzistuoja"
            })
        }

        const sql2 = "SELECT groups.id as id, groups.name as name, users.name as lecturerName, users.surname as lecturerSurname, start, end FROM groups LEFT JOIN courses ON courses.id = groups.course_id LEFT JOIN users ON groups.lecturer_id = users.id WHERE (courses.id = ? AND groups.deleted IS NULL)";
        const [result2] = await pool.query<Group[]>(sql2, [req.params.id]);

        if (result2.length != 0) {
            const fixedResult = result2.map( group => {
            return {...group, start: group.start.toLocaleDateString("LT"), end: group.end.toLocaleDateString("LT")};
        });

        res.json(fixedResult);

        } else {
            res.json(result2);

        }
        

    }
}