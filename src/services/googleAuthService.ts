import { TokenPayload } from "google-auth-library";
import EnvVars from "@src/constants/EnvVars";

import {oauthClient} from "@src/util/oauthClient";


const client = oauthClient;

const id: string = EnvVars.Google.ClientID;
const secret: string = EnvVars.Google.ClientSecret;
const callbackURL: string = EnvVars.Google.CallbackURL;

if (!id || !secret || !callbackURL) {
  throw new Error("Google OAuth credentials are not set properly.");
}

export const verifyToken = 
// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
async (idToken: string): Promise<TokenPayload | undefined> => {
  // eslint-disable-next-line max-len
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const ticket = await client.verifyIdToken({
    idToken,
    audience: EnvVars.Google.ClientID,
  });
  // eslint-disable-next-line max-len
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  return ticket.getPayload();
};
