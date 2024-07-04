import jwt from "jsonwebtoken";
import EnvVars from "@src/constants/EnvVars"; // Assuming environment

/**
 * Generates a JWT for a user.
 * @param userId The unique identifier of the user.
 * @returns A JWT string.
 */
export function generateJwtToken(userId: number): string {
  const payload = {
    sub: userId,
  };
  const secretKey = EnvVars.Jwt.Secret;
  const options = {
    expiresIn: "1h",
  };

  try {
    return jwt.sign(payload, secretKey, options);
  } catch (error) {
    // console.error("Failed to generate JWT", error);
    throw new Error("Failed to generate JWT");
  }
}



export default { generateJwtToken };
