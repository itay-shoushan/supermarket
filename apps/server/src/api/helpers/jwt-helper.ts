import jwt from "jsonwebtoken";
import { IUser } from "../models/user";
export function signToken(obj: IUser):string {
  const token = jwt.sign(
    {
      data: {
        ...obj
      },
    },
    process.env.SECRET,
    { expiresIn: "10h" }
  );

  return token;
}
