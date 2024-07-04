import { IReq, IRes } from "@src/routes/types/express/misc";
import prisma from "@src/config/prismaClient";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import EnvVars from "@src/constants/EnvVars";

const JWT_SECRET = EnvVars.Jwt.Secret;

async function login(
  req: IReq<{
    email: string;
    password: string;
  }>,
  res: IRes,
): Promise<IRes> {
  const { email, password } = req.body;

  try {
    const admin = await prisma.adminUser.findUnique({ where: { email } });

    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ adminId: admin.adminId }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("access_token", token, { httpOnly: true, secure: true });

    return res.status(200).json({ email, message: "Login successful" });
  } catch (error) {
    // console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


export default { login };
