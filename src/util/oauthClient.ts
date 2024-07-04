// src/util/oauthClient.ts

import { OAuth2Client } from "google-auth-library";
import EnvVars from "@src/constants/EnvVars";

export const oauthClient = new OAuth2Client(
  EnvVars.Google.ClientID,
  EnvVars.Google.ClientSecret,
  EnvVars.Google.CallbackURL,
);
