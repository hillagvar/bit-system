import { RowDataPacket } from "mysql2";
import { User } from "./user";

export interface Course extends RowDataPacket {
    id?: number,
    name: string,
}