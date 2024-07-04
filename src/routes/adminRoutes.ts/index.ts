import { Router } from "express";
import adminController from "@src/controllers/adminControllers/loginController";
import Paths from "@src/constants/Paths";
// import authenticateJWT from 
//   "@src/controllers/adminControllers/adminAuthMiddleware";

const adminRouter = Router();

adminRouter.post(Paths.Users.Admin, adminController.login);
// adminRouter.get("/profile", authenticateJWT, adminController.getProfile);

export default adminRouter;
