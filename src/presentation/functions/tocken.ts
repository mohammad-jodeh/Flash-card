import { sign } from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET as string;
if (!secret) {
  throw new Error("JWT_SECRET is not defined in .env");
}

function token(username: string, email: string) {
  return sign({ email, username }, secret , { algorithm: 'HS256' }); // use 'HS256' unless you're actually using RSA keys
}

export default token;
