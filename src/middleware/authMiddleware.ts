import { NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import EnvVars from "@src/constants/EnvVars";
import { IReq, IRes } from "@src/routes/types/express/misc";

const jwtSecret = EnvVars.Jwt.Secret;

const authMiddleware = (req: IReq, res: IRes, next: NextFunction) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(HttpStatusCodes.UNAUTHORIZED).json(
      { message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    if (typeof decoded.sub === "number") {
      res.locals.sessionUser = { id: decoded.sub };
      next();
    } else {
      throw new Error("Invalid token payload.");
    }
  } catch (err) {
    return res.status(HttpStatusCodes.UNAUTHORIZED).json(
      { message: "Invalid token." });
  }
};

export default authMiddleware;
