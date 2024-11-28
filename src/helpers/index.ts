import * as bcrypt from "bcrypt";
import { Payload } from "../dto/user.dto";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../env";

export class encrypt {
  static async encryptPassword(password: string) {
    return bcrypt.hashSync(password, 10);
  }

  static comparePassword(hashedPassword: string, password: string) {
    return bcrypt.compareSync(password, hashedPassword);
  }

  static generateToken(payload: Payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
  }
}
