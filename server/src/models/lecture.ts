import { RowDataPacket } from "mysql2";

export interface Lecture extends RowDataPacket {
    id?: number,
    name: string,
    date: Date,
    description?: string,
    groupId?: number
}