import EnvVars from "@src/constants/EnvVars";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { IRes, IReq } from "@src/routes/types/express/misc";
import { NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authenticateToken = (
  req: IReq<unknown>,
  res: IRes,
  next: NextFunction,
) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const token = req
      .cookies
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      .access_token;
    if (!token) {
      return res.sendStatus(401);
    }
    const { user } = jwt.verify(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      token,
      EnvVars.Jwt.Secret,
    ) as JwtPayload;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    res.locals.sessionUser = user;
    next();
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: error.message });
    } else {
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: "An unknown error occurred" });
    }
  }
};
