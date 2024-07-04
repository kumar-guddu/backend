/* eslint-disable node/no-process-env */
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import { IReq, IRes } from "@src/routes/types/express/misc";
// import { NextFunction } from "express";
// import jwt, { JwtPayload } from "jsonwebtoken";
// import EnvVars from "@src/constants/EnvVars";
import { userService } from "@src/Database/services/userService";

import {generateJwtToken} from "@src/util/jwtUtils";

async function handleUserSignInOrSignUp(
  req: IReq<{ user: { email: string; password: string } }>,
  res: IRes,
) {
  const { email, password } = req.body.user;
  try {
    let user = await userService.getUser(email);

    if (user) {
      if (!user.isEmailVerified) {
        await userService.generateOTP(user.id, email);
        return res.status(HttpStatusCodes.UNAUTHORIZED).send({
          message: "Email not verified. OTP sent to email for verification.",
        });
      }

      if (!user || user.passwordHash === null) {
        return res.status(401).send({ message: "Invalid credentials" });
      }

      const isPasswordCorrect = 
        await userService.verifyPassword(password, user.passwordHash);
      if (isPasswordCorrect) {
        const token = generateJwtToken(user.id); 
        // Set token in an HTTP-only cookie
        res.cookie("access_token", token, {
          httpOnly: true, 
          secure: process.env.NODE_ENV === "production", 
          sameSite: "strict", 
          maxAge: 3600000, 
        });

        return res.status(HttpStatusCodes.OK).send({
          message: "Login successful.",
          user, // Optionally return user details
        });
      } else {
        return res.status(HttpStatusCodes.UNAUTHORIZED).send({
          message: "Incorrect password.",
        });
      }
    } else {
      user = await userService.createUser(email, password);
      await userService.generateOTP(user.id, email);
      return res.status(HttpStatusCodes.CREATED).send({
        message: "User created and OTP sent to email. Please verify.",
      });
    }
  } catch (error) {
    // console.error("Error handling user sign-in or sign-up:", error);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
      error: "Internal server error.",
    });
  }
}


async function otpVerification(
  req: IReq<{ email: string; otp: string }>,
  res: IRes,
){
  try {
    const { email, otp } = req.body;
    await userService.verifyAndActivateEmail(otp, email);
    return res.status(HttpStatusCodes.OK).send({
      success: true,
      message: "OTP verified",
    });
  } catch (error) {
    // console.error("Error verifying OTP:", error);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
      error: "Internal server error.",
    });
  }
}

async function resendOTP(
  req: IReq<{ email: string }>,
  res: IRes,
) {
  try {
    const { email } = req.body;
    const user = await userService.getUser(email);
    
    // Check if user exists before proceeding
    if (!user) {
      // User not found, return an appropriate response
      return res.status(HttpStatusCodes.NOT_FOUND).send({
        success: false,
        message: "User not found. Cannot resend OTP.",
      });
    }

    // Assuming the user is found and user object is available
    await userService.resendOTP(user.id, email);
    return res.status(HttpStatusCodes.OK).send({
      success: true,
      message: "OTP re-sent to email",
    });
  } catch (error) {
    // console.error("Error resending OTP:", error);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
      error: "Internal server error.",
    });
  }
}

async function isAuthenticated(req: IReq, res: IRes) {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(HttpStatusCodes.UNAUTHORIZED).send({
        success: false,
        message: "No access token provided.",
      });
    }

    const user = await userService.verifyToken(token);
    if (!user) {
      return res.status(HttpStatusCodes.UNAUTHORIZED).send({
        success: false,
        message: "Invalid access token.",
      });
    }

    res.locals.sessionUser = user;
    return res.status(HttpStatusCodes.OK).send({
      success: true,
      message: "Authenticated.",
      user,
    });
  } catch (error) {
    // console.error("Error authenticating user:", error);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
      error: "Internal server error.",
    });
  }
}

// async function googleSignIn(

// )

export default { 
  handleUserSignInOrSignUp,
  otpVerification, 
  resendOTP, 
  isAuthenticated,
};