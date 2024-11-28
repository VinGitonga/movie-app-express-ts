import * as express from "express";
import { AuthController } from "../controllers/auth.controller";
import { UserController } from "../controllers/user.controller";
import {
  authentification,
  authorization,
} from "../middlewares/auth.middleware";

const router = express.Router();

router.get(
  "/users",
  authentification,
  authorization(["admin"]),
  UserController.getUsers
);

router.get(
  "/profile",
  authorization(["admin", "user"]),
  authentification,
  AuthController.getProfile
);

router.post("/signup", UserController.signup);

router.post("/login", AuthController.login);

router.put(
  "/update/:id",
  authentification,
  authorization(["admin", "user"]),
  UserController.updateUser
);

router.delete(
  "/delete/:id",
  authentification,
  authorization(["admin"]),
  UserController.deleteUser
);

export { router as userRouter };
