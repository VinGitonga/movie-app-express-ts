import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/user.entity";
import { encrypt } from "../helpers";

export class AuthController {
  static async login(req: Request, res: Response): Promise<any> {
    try {
      const { email, password } = req.body;

      if (!email || password) {
        return res.status(400).json({
          success: false,
          message: "Email & Password are required fields",
        });
      }

      const userRepo = AppDataSource.getRepository(User);
      const user = await userRepo.findOne({ where: { email } });

      const isPasswordValid = encrypt.comparePassword(user.password, password);
      if (!user || !isPasswordValid) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid Email or Password" });
      }

      const token = encrypt.generateToken({ id: user.id });

      return res.status(200).json({ success: true, data: { user, token } });
    } catch (err) {
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  static async getProfile(req: Request, res: Response): Promise<any> {
    if (!req["currentUser"]) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({
      where: { id: req["currentUser"].id },
    });

    res.status(200).json({ success: true, data: { ...user, password: null } });
    return;
  }
}
