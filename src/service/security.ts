import * as jwt from "jsonwebtoken";
import * as admin from "firebase-admin";
import { TokenData, TokenResponse } from "../models/auth.model";
// import * as utilJWT from "node-utilJWT";
import { TOKEN_EXPIRE_IN, TOKEN_SECRET_KEY } from "./config/config";
import { IUser } from "src/models/user.model";

export function buildTokenFromUser(user: IUser) {
  const data: TokenData = {
    id: user.id,
    name: user.name,
    lastname: user.lastname,
    email: user.email,
    companyName: user.companyName,
  };
  return createJWT(data);
}

export function createJWT(data: TokenData): string {
  const token = jwt.sign({ data }, TOKEN_SECRET_KEY, {
    expiresIn: TOKEN_EXPIRE_IN,
  });
  return token;
}

export function verifyToken(token: string): boolean {
  try {
    const decoded = jwt.verify(token, TOKEN_SECRET_KEY);
    console.log("Token decoded: ", decoded);
    return true;
  } catch (ex) {
    console.log("Invalid token");
    return false;
  }
}

export function decodeJwt<T>(token: string): T {
  const decoded: any = jwt.verify(token, TOKEN_SECRET_KEY);
  return decoded.data;
}

export function decodeToken(token: string): TokenData {
  try {
    const decoded = jwt.verify(token, TOKEN_SECRET_KEY) as any;
    console.log("Token decoded", decoded);
    return decoded.data;
  } catch (ex) {
    console.log("Invalid token");
    throw new Error("INVALID_TOKEN");
  }
}

export async function generateToken({
  user,
}: {
  user: IUser;
}): Promise<TokenResponse> {
  const token = buildTokenFromUser(user);
  const fbtoken = await admin.auth().createCustomToken(user.id);
  return { token: token, fbtoken: fbtoken };
}
