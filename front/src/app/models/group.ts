export interface ResultCoursesUsers {
    id: number,
    name: string,
    surname: string
}

export interface Group {
    id?: number,
    name: string,
    start: Date,
    end: Date,
    courseId: number,
    lecturer: ResultCoursesUsers,
}