/* eslint-disable no-console */
import prisma from "@src/config/prismaClient";
import { User, OTP } from "@prisma/client"; 
import * as bcrypt from "bcrypt";
import { sendOTPEmail } from "@src/util/emailService";  
import EnvVars from "@src/constants/EnvVars";
import jwt from "jsonwebtoken";
import { IUser} from "@src/Database/interfaces/user";
// import crypto from "crypto";


const saltRounds = 10; // Defines the complexity of the hash - the cost factor.
interface GoogleTokenPayload {
  sub: string; // Google's unique ID for the user
  email?: string;
  given_name?: string; // Optional given name
  family_name?: string; // Optional family name
}

class UserService {
  /**
   * Creates a new user in the database.
   * @param {string} email - The email of the user.
   * @param {string} password - The user's password.
   * @returns {Promise<User>} The created user object.
   */
  public async createUser(email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await prisma.user.create({
      data: {
        email: email,
        passwordHash: hashedPassword,
        isActive: true,
        isEmailVerified: false,
        isMobileVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return newUser;
  }

  /**
   * Updates a user's name in the database.
   * @param {number} userId - The ID of the user to update.
   * @param {string} name - The new name for the user.
   * @returns {Promise<User>} The updated user object.
   */
  public async updateUser(userId: number, name: string): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name: name, updatedAt: new Date() },
    });
    return updatedUser;
  }

  /**
   * Authenticates a user based on email and password.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<null>} returns object if credentials are correct
   */
  public async loginUser(
    email: string,
    password: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    // eslint-disable-next-line max-len
    if (!user || !user.passwordHash || !await bcrypt.compare(password, user.passwordHash)) {
      return null; // Return null if user does not exist
    }

    return user; // Return the user object if credentials are correct
  }


  /**
   * Generates and sends an OTP to a user's email.
   * @param {number} userId - The user's ID.
   * @param {string} email - The user's email.
   * @returns {Promise<OTP>} The generated OTP object.
   */
  public async generateOTP(userId: number, email: string): Promise<OTP> {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); 
    const expiresAt = new Date(new Date().getTime() + (5 * 60 * 1000));
    const otp = await prisma.oTP.create({
      data: {
        userId: userId,
        email: email,
        otpCode: otpCode,
        createdAt: new Date(),
        expiresAt: expiresAt,
      },
    });
    await sendOTPEmail(email, otpCode);
    return otp;
  }

  /**
   * Verifies OTP for a given email, and if valid, marks the email as verified.
   * @param {string} otpCode - The OTP submitted by the user.
   * @param {string} email - The user's email to which the OTP was sent.
   * True if OTP is valid and  email was verified, otherwise throws an error.
   * @returns {Promise<boolean>}
   */
  public async verifyAndActivateEmail(
    otpCode: string,
    email: string): Promise<boolean> {
    return prisma.$transaction(async (transact) => {
      const otp = await transact.oTP.findFirst({
        where: {
          email: email,
          otpCode: otpCode,
          expiresAt: { gt: new Date() },
        },
      });

      if (!otp) {
        throw new Error("Invalid or expired OTP");
      }

      // If the OTP is valid, update the user's email verification status
      const userUpdate = await transact.user.update({
        where: { email: email },
        data: { isEmailVerified: true },
      });

      // Optionally, you can delete the OTP entry if it should no longer be used
      await transact.oTP.delete({
        where: { otpId: otp.otpId },
      });

      return userUpdate.isEmailVerified;
    });
  }

  /**
   * Resends an OTP to a user's email.
   * @param {number} userId - The user's ID.
   * @param {string} email - The user's email.
   * @returns {Promise<OTP>} The newly generated OTP object.
   */
  public async resendOTP(userId: number, email: string): Promise<OTP> {
    return this.generateOTP(userId, email);
  }

  /**
   * Resets a user's password.
   * @param {string} email - The email of the user.
   * @param {string} newPassword - The new password to set.
   * @returns {Promise<User>} The updated user object with the new password.
   */
  public async resetPassword(
    email: string,
    newPassword: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    const updatedUser = await prisma.user.update({
      where: { email: email },
      data: { passwordHash: hashedPassword, updatedAt: new Date() },
    });
    return updatedUser;
  }

  /**
   * Retrieves the ID of a user based on their email.
   * @param {string} email - The email to search for.
   * @returns {Promise<number | null>} The user's ID if found, otherwise null.
   */
  public async getUserId(email: string): Promise<number | null> {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { id: true },
    });

    if (!user) {
      console.log("User not found for the provided email:", email);
      return null;
    }
    return user.id;
  }

  /**
   * Retrieves a user based on their email.
   * @param email The email to search for.
   * @returns {Promise<User | false>} object if found, otherwise false.
   */
  public async getUser(email: string): Promise<User | false> {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      console.log("User not found for the provided email:", email);
      return false;
    }
    return user;
  }

  /**
   * Retrieves a is user email is verified.
   * @param email The email to search for.
   * @returns {Promise<User | boolean>} object if found, otherwise false.
   */
  public async isEmailVerified(email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { isEmailVerified: true },
    });

    if (!user) {
      console.log("User not found for the provided email:", email);
      return false;
    }
    return user.isEmailVerified;
  }


  /**
   * Retrieves a is user mobile is verified.
   * @param email The email to search for.
   * @returns {Promise<User | boolean>} object if found, otherwise false.
   */

  public async isMobileVerified(email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { isMobileVerified: true },
    });

    if (!user) {
      console.log("User not found for the provided email:", email);
      return false;
    }
    return user.isMobileVerified;
  }


  /**
   * Verifies if provided password matches the stored password hash for a user.
   * @param plainPassword The password provided by the user.
   * @param hashedPassword The hashed password stored in the database.
   * @returns {Promise<boolean>} True if the passwords match, otherwise false.
   */
  public async verifyPassword(
    plainPassword: string, 
    hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  /**
 * Verifies a JWT and retrieves user based on the userId in the JWT's subject
 * @param token The JWT string to verify.
 * @returns The user object if verified and found, otherwise null.
 */
  public async verifyToken(token: string) {
    try {
      // Verify the token with the secret key
      const decoded = jwt.verify(token, EnvVars.Jwt.Secret) as jwt.JwtPayload;
      console.log("Decoded token:", decoded);
  
      // Handle 'sub' whether it's a string or a number
      if (!decoded.sub) {
        console.log("Invalid token: Subject (sub) is missing");
        return null;
      }
  
      // Ensure 'sub' is treated as a number
      const userId = Number(decoded.sub);
      if (isNaN(userId)) {
        // console.log("Invalid token: Subject (sub) is not a valid user ID");
        return null;
      }
  
      // Retrieve the user from the database
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
  
      if (!user) {
        // console.log("User not found with ID from token");
        return null;
      }
  
      return user as IUser; 
    } catch (error) {
      // console.error("Error verifying token:", error);
      return null;
    }
  }

  /**
   * Create user by google sign in OAuth2.0
   * @param {string} email - The user's email.
   * @param {string} name - The user's name.
   * @params {string} googleOauthId - The user's googleOauthId.
   * @returns {Promise<User | null>} The newly created user object.
   */

  public async findOrCreateGoogleUser(
    profile: GoogleTokenPayload): Promise<IUser | null> {
    if (!profile.email) {
      console.log("Email is required but not provided in the token.");
      return null;
    }

    let user = await prisma.user.findUnique({
      where: { googleOauthId: profile.sub },
    });

    if (user) return user;

    // const dummyPassword = crypto.randomBytes(16).toString("hex");
    // const hashedPassword = await bcrypt.hash(dummyPassword, 10);

    user = await prisma.user.create({
      data: {
        name: `${profile.given_name || ""} ${profile.family_name || ""}`.trim(),
        email: profile.email ,
        requirePassword: false, 
        googleOauthId: profile.sub,
        isActive: true,
        isEmailVerified: true, // Assuming Google email is always verified
        isMobileVerified: false, // Default to false unless specified
      },
    });
    return user;
  }

}

export const userService = new UserService();
