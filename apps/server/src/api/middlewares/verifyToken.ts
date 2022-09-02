import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default function verifyTokenMiddleware(req: Request, res: Response, next: NextFunction) {
    const authorization = req?.headers?.authorization;
    if(!authorization) return next(new Error("UnAuthorized error"));
    jwt.verify(authorization, process.env.SECRET, (err, decoded) => {
        if (err) {
            return next(new Error("UnAuthorized: " + err?.message));
        } else {
            req.userData = decoded?.data;
            return next();
        }
    });
}
