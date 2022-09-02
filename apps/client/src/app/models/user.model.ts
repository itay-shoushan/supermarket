export interface IUserLogin {
    email: string,
    password: string
}
export interface IUserRegister {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    passwordConfirm: string,
    city: string,
    street: string
}