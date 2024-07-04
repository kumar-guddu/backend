// src/routes/userRoutes.ts
import { Router } from "express";

import Paths from "@src/constants/Paths";
// import UserRoutes from "@src/controllers/user";
import { googleAuthRedirect, googleCallback } 
  from "@src/controllers/googleAuthController";

import UserRoutes from "@src/controllers/userController";

// const validate = jetValidator();

const userRouter = Router();


userRouter.post(Paths.Users.signin, UserRoutes.handleUserSignInOrSignUp);
userRouter.get(Paths.Users.protected, UserRoutes.isAuthenticated);
// userRouter.post(Paths.Users.GenerateOtp, UserRoutes.generateOtpByUrl);
userRouter.post(Paths.Users.VerifyOtp, UserRoutes.otpVerification);
// userRouter.post(Paths.Users.resendOTP, UserRoutes.resendOTP);
userRouter.get(Paths.Users.googleSignIn, googleAuthRedirect);
userRouter.get(Paths.Users.googleCallback, googleCallback);
// userRouter.post(Paths.Users.userName, UserRoutes.addUsername);

export default userRouter;
