import express, { NextFunction, Request, Response } from "express";
import router from "./routes/index";
import cookieParser from "cookie-parser";
import session from "express-session";
import { mockProducts, mockUsers } from "./utils/constants";
import passport from "passport";

const app = express();
app.use(express.json());
app.use(cookieParser("HelloWorld"));
app.use(
  session({
    secret: "bhaskar the great",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
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
  console.log(req.session);
  console.log(req.sessionID);
  req.session.visited = true;
  res.cookie("hello", "world", { maxAge: 30000, signed: true });
  res.status(201).send({ msg: "Hello World!" });
});

app.post("/api/auth", (req, res) => {
  const { username, password } = req.body;
  const findUser = mockUsers.find((user) => user.username === username);
  if (!findUser || findUser.password !== password) {
    return res.status(401).send({ msg: "Bad Credentials" });
  }
  req.session.user = findUser;
  return res
    .status(200)
    .send({ msg: "Logged in successfully", user: findUser });
});

app.get("/api/auth/status", (req, res) => {
  req.sessionStore.get(req.sessionID, (err, session) => {
    console.log(session);
  });
  if (req.session.user) {
    return res.status(200).send({ msg: "Logged in", user: req.session.user });
  }
  return res.status(401).send({ msg: "Not logged in" });
});

app.post("/api/cart", (req, res) => {
  if (!req.session.user) {
    return res.status(401).send({ msg: "Not logged in" });
  }
  const { productId, productName } = req.body;
  const product = mockProducts.find((product) => product.id === productId);
  if (!product) {
    return res.status(404).send({ msg: "Product not found" });
  }
  req.session.cart = req.session.cart || [];
  req.session.cart.push(product);
  res.status(200).send({ msg: "Product added to cart" });
});

app.get("/api/cart", (req, res) => {
  if (!req.session.user) {
    return res.status(401).send({ msg: "Not logged in" });
  }
  res.status(200).send({ cart: req.session.cart });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
