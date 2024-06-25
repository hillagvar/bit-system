import { RowDataPacket } from "mysql2";
import { Group } from "./group";

export interface Lecture extends RowDataPacket {
    id?: number,
    name: string,
    date: Date,
    description?: string,
    group: Group
}