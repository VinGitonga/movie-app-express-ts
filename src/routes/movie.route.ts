import * as express from "express";
import { MovieController } from "../controllers/movie.controller";
import {
  authentification,
  authorization,
} from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/movies", authentification, MovieController.getAllMovie);

router.post("/movies", authentification, MovieController.createMovie);

router.put(
  "/movies/:id",
  authentification,
  authorization(["admin"]),
  MovieController.updateMovie
);

router.delete("/movies/:id", authentification, authorization(["admin"]));

export { router as movieRouter };
