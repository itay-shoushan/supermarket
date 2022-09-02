import { getConnection } from "../../config/database_config";
import { isIDExistQuery, isUserExistQuery, registerUserQuery } from "../helpers/queries";
import { IUser } from "../models/user";

export async function isUserExist(email: string): Promise<IUser> {
    const query = isUserExistQuery();
    const [result] = await getConnection().execute(query, [email]);
    return result[0];
}
export async function isIDExist(id: string): Promise<IUser> {
    const query = isIDExistQuery();
    const [result] = await getConnection().execute(query, [id]);
    return result[0];
}
export async function registerUser(obj: IUser): Promise<any> {
    const query = registerUserQuery();
    const [result] = await getConnection().execute(query, Object.values(obj));
    return result;
}
