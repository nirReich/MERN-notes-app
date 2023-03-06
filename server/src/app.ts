import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRoutes from "./routes/notes";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use("/api/notes", notesRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, "endpoint not found!"));
});

//error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMsg = `unknown error occurred!`;
  let errorStatus = 500;
  if (isHttpError(error)) {
    errorStatus = error.status;
    errorMsg = error.message;
  }
  res.status(errorStatus).json({ error: errorMsg });
});

export default app;
