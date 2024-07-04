// src/utils/emailService.ts
import nodemailer from "nodemailer";
import EnvVars from "@src/constants/EnvVars";

const emailUser = EnvVars.Email.User;
const emailPassword = EnvVars.Email.Pass;

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: emailUser,
    pass: emailPassword,
  },
});



export const sendOTPEmail =
  async (email: string, otp: string): Promise<void> => {
    const mailOptions = {
      from: EnvVars.Email.User,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      throw new Error("Failed to send OTP email.");
    }
  };