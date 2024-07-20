import express, { NextFunction, Request, Response } from "express";
import router from "./routes/index";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser("HelloWorld"));
app.use(router);

// middleware

const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("Request received at: ", new Date());
  console.log(`${req.method} ${req.url}`);
  next();
};

const port = process.env.PORT || 3000;

// All get requests
app.get("/", (req, res) => {
  res.cookie("hello", "world", { maxAge: 30000, signed: true });
  res.status(201).send({ msg: "Hello World!" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
