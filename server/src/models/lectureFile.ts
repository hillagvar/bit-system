import { RowDataPacket } from "mysql2";

export interface LectureFile extends RowDataPacket {
    id?: number,
    name: string,
    url: string,
    hidden: number,
    lectureId: number
}