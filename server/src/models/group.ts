import { RowDataPacket } from "mysql2";

// export interface Group extends RowDataPacket {
//     id?: number,
//     name: string,
//     start: Date,
//     end: Date,
//     courseId?: number,
//     lecturerId?: number,
//     lecturerName?: string,
//     lecturerSurname?: string,
// }

export interface ResultCoursesUsers extends RowDataPacket {
    id: number,
    name: string,
    surname: string
}

export interface Group extends RowDataPacket {
    id?: number,
    name: string,
    start: Date,
    end: Date,
    courseId: number,
    lecturer: ResultCoursesUsers,
}