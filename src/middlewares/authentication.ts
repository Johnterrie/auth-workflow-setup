import { Request, Response, NextFunction } from "express";
import { UnauthenticatedError, UnauthorizedError } from "../error";
import { isTokenValid } from "../utils";
import Token from "../models/Token";
import { attachCookiesToResponse } from "../utils";
import Payload from "../types/authentication";

interface UserPayload {
  userId: string;
  role: string;
  // Other user properties if needed
}

interface TokenPayload {
  user: UserPayload;
  refreshToken: string;
  // Other token properties if needed
}

const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { refreshToken, accessToken } = req.signedCookies;

  try {
    let payload: TokenPayload | null = null;

    if (accessToken) {
      payload = isTokenValid(accessToken);
    } else {
      payload = isTokenValid(refreshToken);
    }

    if (!payload) {
      throw new UnauthenticatedError("Authentication Invalid");
    }

    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });

    if (!existingToken || !existingToken.isValid) {
      throw new UnauthenticatedError("Authentication Invalid");
    }

    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    });

    req.user = payload.user;
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

const authorizePermissions = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.user as UserPayload | undefined;
    if (!user || !roles.includes(user.role)) {
      throw new UnauthorizedError("Unauthorized to access this route");
    }
    next();
  };
};

export { authenticateUser, authorizePermissions };
