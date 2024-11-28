import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/user.entity";
import { encrypt } from "../helpers";
import * as cache from "memory-cache";

export class UserController {
  static async signup(req: Request, res: Response): Promise<any> {
    const { name, email, password, role } = req.body;

    const encrypedPassword = await encrypt.encryptPassword(password);
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = encrypedPassword;
    user.role = role;

    const userRepo = AppDataSource.getRepository(User);
    await userRepo.save(user);

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      data: { ...user, password: null },
    });
  }

  static async getUsers(req: Request, res: Response): Promise<any> {
    const data = cache.get("data");

    if (data) {
      return res.status(200).json({ success: true, data });
    }

    const userRepo = AppDataSource.getRepository(User);
    const users = await userRepo.find();

    cache.put("data", users, 6000);

    return res.status(200).json({ success: true, data: users });
  }

  static async updateUser(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    const { name, email } = req.body;

    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { id } });
    user.name = name;
    user.email = email;

    await userRepo.save(user);

    return res
      .status(200)
      .json({ success: true, data: { ...user, password: null } });
  }

  static async deleteUser(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { id } });
    await userRepo.remove(user);
    return res.status(200).json({ success: true, message: "ok" });
  }
}
