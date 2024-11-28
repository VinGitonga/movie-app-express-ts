import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { User } from "../entity/user.entity";
import { JWT_SECRET } from "../env";

export const authentification = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = header.split(" ")[1]; // get the bearer token
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const decode = jwt.verify(token, JWT_SECRET!);

  if (!decode) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  req["currentUser"] = decode;

  next();
};

export const authorization = (roles: string[]) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOne({
      where: { id: req["currentUser"].id },
    });

    if (!roles.includes(user.role)) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    next();
  };
};
