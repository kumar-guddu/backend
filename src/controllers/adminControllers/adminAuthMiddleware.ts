import { NextFunction } from "express";
import {IReq, IRes} from "@src/routes/types/express/misc";
import jwt, { JwtPayload } from "jsonwebtoken";
import EnvVars from "@src/constants/EnvVars";

const JWT_SECRET = EnvVars.Jwt.Secret;

const authenticateJWT = (req: IReq, res: IRes, next: NextFunction) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden" });
  }
};

export default authenticateJWT;
