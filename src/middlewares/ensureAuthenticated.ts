import { Response, NextFunction, Request } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../config/auth";
//import Request from "../interfaces/customRequest";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader || authHeader === "Bearer") {
    throw new Error("JWT token is missing");
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as TokenPayload;

    request.headers.user = sub;

    return next();
  } catch {
    throw new Error("Invalid JWT token");
  }
}
