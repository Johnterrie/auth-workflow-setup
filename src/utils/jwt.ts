import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import { Response } from "express";

interface UserPayload {
  user: string;
  refreshToken?: string;
}

const createJWT = (payload: UserPayload): string => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string);
  return token;
};

const isTokenValid = (token: string): UserPayload | string => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as UserPayload;
    return decoded;
  } catch (error) {
    return "Invalid token"; // Handle the invalid token scenario
  }
};

interface AttachCookiesParams {
  res: Response;
  user: string;
  refreshToken?: string;
}

const attachCookiesToResponse = ({
  res,
  user,
  refreshToken,
}: AttachCookiesParams) => {
  const accessTokenJWT = createJWT({ user });
  const refreshTokenJWT = refreshToken
    ? createJWT({ user, refreshToken })
    : undefined;

  const oneDay = 1000 * 60 * 60 * 24;
  const longerExp = 1000 * 60 * 60 * 24 * 30;

  res.cookie("accessToken", accessTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    expires: new Date(Date.now() + oneDay),
  });

  if (refreshTokenJWT) {
    res.cookie("refreshToken", refreshTokenJWT, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      signed: true,
      expires: new Date(Date.now() + longerExp),
    });
  }
};

export { createJWT, isTokenValid, attachCookiesToResponse };
