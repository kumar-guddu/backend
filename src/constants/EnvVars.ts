/* eslint-disable node/no-process-env */
import dotenv from "dotenv";

dotenv.config({ path: "@env/development.env" });

interface EnvVarsConfig {
  NodeEnv: string;
  Port: number;
  MongoUri: string;
  CookieProps: {
    Key: string;
    Secret: string;
    tokenFromCookie: string;
    Options: {
      httpOnly: boolean;
      signed: boolean;
      path: string;
      maxAge: number;
      domain: string;
      secure: boolean;
    };
  };
  Jwt: {
    Secret: string;
    Exp: string;
  };
  Google: {
    ClientID: string;
    ClientSecret: string;
    CallbackURL: string;
  };
  ALPHAVANTAGE_API_KEY: string;
  Session: {
    Secret: string;
  };
  Email: {
    User: string;
    Pass: string;
  };
  OTP: {
    OtpExpiry: string;
    Delay: string;
  };
  Postgresql:{
    URL: string;
  }
}

const EnvVars: EnvVarsConfig = {
  NodeEnv: process.env.NODE_ENV || "",
  Port: Number(process.env.PORT) || 0,
  MongoUri: process.env.MONGO_URI || "no-uri",
  CookieProps: {
    Key: "auth-token",
    Secret: process.env.COOKIE_SECRET || "",
    tokenFromCookie: process.env.TOKEN_FROM_COOKIE || "no-token",
    Options: {
      httpOnly: true,
      signed: true,
      path: process.env.COOKIE_PATH || "",
      maxAge: Number(process.env.COOKIE_EXP) || 0,
      domain: process.env.COOKIE_DOMAIN || "",
      secure: process.env.SECURE_COOKIE === "true",
    },
  },
  Jwt: {
    Secret: process.env.JWT_SECRET || "",
    Exp: process.env.COOKIE_EXP || "",
  },
  Google: {
    ClientID: process.env.GOOGLE_CLIENT_ID || "",
    ClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    CallbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL || "",
  },
  ALPHAVANTAGE_API_KEY: process.env.ALPHAVANTAGE_API_KEY || "",
  Session: {
    Secret: process.env.SESSION_SECRET || "",
  },
  Email: {
    User: process.env.EMAIL_USER || "",
    Pass: process.env.Password || "",
  },
  OTP: {
    OtpExpiry: process.env.OTP_EXP || "",
    Delay: process.env.ResendDelay || "",
  },
  Postgresql:{
    URL: process.env.POSTGRES_URL || "",
  },
};

export default EnvVars;
