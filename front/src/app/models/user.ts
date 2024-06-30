export interface User {
    id: number | null,
    name?: string,
    surname?: string,
    phone?: string,
    email: string,
    password: string,
    type?: number,
    token?: string,
    pairId?: number
}