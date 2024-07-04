/* eslint-disable node/no-process-env */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable max-len */
import { verifyToken } from "@src/services/googleAuthService";
import { userService } from "@src/Database/services/userService";
import EnvVars from "@src/constants/EnvVars";
import { Request, Response } from "express";
import { generateJwtToken } from "@src/util/jwtUtils";
import {oauthClient} from "@src/util/oauthClient";


const client = oauthClient;

export const googleAuthRedirect = (req: Request, res: Response) => {
  const redirectUri = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${EnvVars.Google.ClientID}&redirect_uri=${EnvVars.Google.CallbackURL}&scope=openid%20email%20profile`;
  res.redirect(redirectUri);
};

export const googleCallback = async (req: Request<{ code: string }>, res: Response) => {
  try {
    const { code } = req.query;

    const { tokens } = await client.getToken({
      code: code as string,
      redirect_uri: EnvVars.Google.CallbackURL,
    });

    const profile = await verifyToken(tokens.id_token as string);

    if (!profile) {
      return res.status(401).send({ message: "Invalid Google token." });
    }

    const user = await userService.findOrCreateGoogleUser(profile);
    if (!user) {
      return res.status(404).send({ message: "User could not be created or found." });
    }

    const jwtToken = generateJwtToken(user.id);

    res.cookie("jwt", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000, // 24 hours
    });

    // Redirect to frontend with token and user info
    // res.redirect(`http://localhost:3000/welcome?token=${jwtToken}&email=${user.email}`);
    res.send({user, token: jwtToken});
  } catch (error) {
    return res.status(500).json({ message: "Authentication failed." });
  }
};
