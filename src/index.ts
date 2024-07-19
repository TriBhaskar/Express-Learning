import express, { NextFunction, Request, Response } from "express";
import usersRouter from "./routes/users";
import productsRouter from "./routes/products";

const app = express();
app.use(express.json());
app.use(usersRouter);
app.use(productsRouter);

// middleware

const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("Request received at: ", new Date());
  console.log(`${req.method} ${req.url}`);
  next();
};

const port = process.env.PORT || 3000;

// All get requests
app.get(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    console.log("Inside a middleware function");
    next();
  },
  (req: Request, res: Response, next: NextFunction) => {
    console.log("Inside a middleware function second time");
    next();
  },

  (req, res) => {
    res.status(201).send({ msg: "Hello World!" });
  }
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
