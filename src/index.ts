import * as express from "express";
import { errorHandler } from "./middlewares/error.middleware";
import { userRouter } from "./routes/user.route";
import { movieRouter } from "./routes/movie.route";
import { AppDataSource } from "./data-source";
import { PORT } from "./env";
import { morganMiddleware } from "./middlewares/morgan.middleware";
import { logger } from "./logger/winston";

const app = express();

app.use(express.json());
app.use(morganMiddleware);

// @ts-expect-error
app.use(errorHandler);

app.use("/auth", userRouter);
app.use("/api", movieRouter);

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).send("Hi party people")
})

app.get("*", (req: express.Request, res: express.Response) => {
  res
    .status(503)
    .json({ success: false, message: "Something really bad happeneed" });
});

AppDataSource.initialize()
  .then(async () =>  {
    app.listen(PORT, () => {
      logger.info(`Server running on http://localhost:${PORT}`);
    });
    logger.info("Data Source has been initialized");
  })
  .catch((err) => logger.error(err));
