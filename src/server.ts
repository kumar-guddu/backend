/**
 * Setup express server.
 */

import cookieParser from "cookie-parser";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import BaseRouter from "@src/routes/api";
import Paths from "@src/constants/Paths";
import cors from "cors";
import { connectToDatabase } from "./config/databaseConfig";
// eslint-disable-next-line node/no-extraneous-import
import bodyParser from "body-parser";

// **** Variables **** //

const app = express();

const ALLOWED_ORIGINS = ["http://localhost:3000"];
app.use(
  cors({
    origin: ALLOWED_ORIGINS,
    credentials: true,
  }),
);
app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = String(req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(Paths.Base, BaseRouter);

function errorHandlerCustom(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!res.headersSent) {
    res.status(500).send(
      { error: "Internal Server Error. Please try again later" });
  } else {
    next(err);
  }
}
app.use(errorHandlerCustom);
connectToDatabase();
// Add APIs, must be after middleware
// ** Export default ** //
// Start the server and listen on the specified port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
