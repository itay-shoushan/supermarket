export interface IUser {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    password?: string,
    role?: string,
    city?: string,
    street?: string,
}
