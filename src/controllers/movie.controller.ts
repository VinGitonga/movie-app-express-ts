import { Request, Response } from "express";
import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { Movie } from "../entity/movie.entity";

export class MovieController {
  static async getAllMovie(req: Request, res: Response): Promise<any> {
    const data = cache.get("data");

    if (data) {
      console.log("Serving from cache");
      return res.status(200).json({ success: true, data });
    }

    console.log("Serving from db");

    const movieRepo = AppDataSource.getRepository(Movie);

    const movies = await movieRepo.find();

    cache.put("data", movies, 10000);

    return res.status(200).json({ success: true, data: movies });
  }

  static async createMovie(req: Request, res: Response): Promise<any> {
    const { title, description, director, year, rating, image, cast } =
      req.body;

    const movie = new Movie();

    movie.title = title;
    movie.description = description;
    movie.director = director;
    movie.year = year;
    movie.rating = rating;
    movie.image = image;
    movie.cast = cast;

    const movieRepo = AppDataSource.getRepository(Movie);
    const savedMovie = await movieRepo.save(movie);

    return res.status(200).json({ success: true, data: savedMovie });
  }

  static async updateMovie(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    const movieRepo = AppDataSource.getRepository(Movie);

    const existingMovie = await movieRepo.findOne({ where: { id } });

    if (!existingMovie) {
      return res
        .status(400)
        .json({ success: false, message: "Movie not found" });
    }

    const updatedResult = await movieRepo.update({ id }, { ...req.body });

    return res.status(200).json({
      success: true,
      data: updatedResult,
      message: "Movie updated successfully",
    });
  }

  static async deleteMovie(req: Request, res: Response): Promise<any> {
    const { id } = req.params;

    const movieRepo = AppDataSource.getRepository(Movie);

    const existingMovie = await movieRepo.findOne({ where: { id } });

    if (!existingMovie) {
      return res
        .status(400)
        .json({ success: false, message: "Movie not found" });
    }

    const deletedResult = await movieRepo.remove(existingMovie);

    return res
      .status(200)
      .json({
        success: true,
        message: "Movie deleted successfully",
        data: deletedResult,
      });
  }
}
