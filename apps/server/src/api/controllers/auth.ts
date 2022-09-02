import { signToken } from "../helpers/jwt-helper";
import { isIDExist, isUserExist, registerUser } from "../services/auth";
import { Request, Response, NextFunction } from "express";
import { IUser } from "../models/user";

export async function loginHandler(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req?.body;
  try {
    if (!email || !password)
      return res.status(400).json({ message: "bad request" });
    const currentUser = await isUserExist(email);
    if (!currentUser)
      return res.status(400).json({ message: "user don't exist" });
    if (currentUser?.email !== email || currentUser?.password !== password)
      return res.status(401).json({ message: "user not authorized" });
    delete currentUser.password;
    const token = signToken(currentUser);
    return res.status(200).json({ token, email: currentUser?.email, message: "user logged in successfully" });
  } catch (error) {
    return next(new Error("loginHandler error:" + error?.message));
  }
}
export async function registerHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const currentUser = await isUserExist(req?.body?.email);
    const currentID = await isIDExist(req?.body?.id);
    if (currentUser || currentID)
      return res.status(400).json({ message: "user already exist" });
    else {
      const { id, first_name, last_name, email, password, city, street } = req?.body
      const currentRegisterUser: IUser = { id, first_name, last_name, email, password, city, street }
      const result = await registerUser(currentRegisterUser);
      if (!result) return next(new Error("registerSecondHandler error"));
      return res.status(201).json({ message: "user created successfully", email: req?.body?.email })
    }
  } catch (error) {
    return next(new Error(error.message));
  }
}
export async function logoutHandler(req: Request, res: Response, next: NextFunction) {
  try {
    return res.json({ message: "user logged out successfully" })
  } catch (error) {
    return next(new Error());
  }
}