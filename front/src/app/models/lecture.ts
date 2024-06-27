export class Lecture {
    constructor (
    public groupId: number,
    public name: string,
    public date: Date,
    public id?: number,
    public description?: string,
    public courseId?: number
) {

}
}