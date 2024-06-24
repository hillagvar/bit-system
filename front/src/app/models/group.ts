export interface Group {
    id?: number,
    name: string,
    start: Date,
    end: Date,
    courseId?: number,
    lecturerId?: number,
    lecturerName?: string,
    lecturerSurname?: string
}