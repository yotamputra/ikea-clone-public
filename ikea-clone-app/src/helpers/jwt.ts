import jwt from "jsonwebtoken";
import * as jose from "jose";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const signToken = (payload: { _id: string }) => {
  return jwt.sign(payload, JWT_SECRET);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

export const readPayloadJose = async <T>(token: string) => {
  const secret = new TextEncoder().encode(JWT_SECRET);
  const { payload } = await jose.jwtVerify<T>(token, secret);

  return payload;
};
