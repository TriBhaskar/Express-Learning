import express, { NextFunction } from "express";
import { Request, Response } from "express-serve-static-core";

const app = express();
app.use(express.json());

// middleware

const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("Request received at: ", new Date());
  console.log(`${req.method} ${req.url}`);
  next();
};

// middleware to validate user id
const resolveUserById = (req: Request, res: Response, next: NextFunction) => {
  const {
    params: { id },
  } = req;
  const userId = parseInt(id);
  if (isNaN(userId)) {
    return res.status(400).send({ msg: "Invalid ID" });
  }
  const userIndex = mockUsers.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).send({ msg: "User not found" });
  }
  req.userIndex = userIndex;
  next();
};

const port = process.env.PORT || 3000;

const mockUsers = [
  {
    id: 1,
    name: "Bhaskar Panthri",
    marks: 90,
  },
  {
    id: 2,
    name: "Rohit Panthri",
    marks: 80,
  },
  {
    id: 3,
    name: "Rahul Panthri",
    marks: 85,
  },
  {
    id: 4,
    name: "Rajesh Panthri",
    marks: 82,
  },
  {
    id: 5,
    name: "Ramesh Panthri",
    marks: 78,
  },
  {
    id: 6,
    name: "Rakesh Panthri",
    marks: 91,
  },
  {
    id: 7,
    name: "Raj Panthri",
    marks: 89,
  },
];

const mockProducts = [
  {
    id: 1,
    name: "Shirt",
    price: 500,
  },
  {
    id: 2,
    name: "Pant",
    price: 1000,
  },
];

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

app.get("/api/users", (req: Request, res: Response) => {
  console.log(req.query);
  const {
    query: { filter, value },
  } = req;
  if (filter && value) {
    return res.send(
      mockUsers.filter((user) => user.name.includes(value.toString()))
    );
  }
  return res.send(mockUsers);
});

app.use(loggingMiddleware, (req, res, next) => {
  console.log("Finished logging");
  next();
});

app.get("/api/users/:id", (req: Request, res: Response) => {
  console.log(req.params);
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).send({ msg: "Invalid ID" });
  }
  const user = mockUsers.find((user) => user.id === id);
  if (!user) {
    return res.status(404).send({ msg: "User not found" });
  }
  res.send(user);
});

app.get("/api/products", (req: Request, res: Response) => {
  res.send(mockProducts);
});

// All post requests
app.post("/api/users", (req: Request, res: Response) => {
  console.log(req.body);
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...req.body };
  mockUsers.push(newUser);
  res.status(201).send(newUser);
});

// All put requests
app.put("/api/users/:id", resolveUserById, (req: Request, res: Response) => {
  const { body, userIndex } = req;
  mockUsers[userIndex] = { id: mockUsers[userIndex].id, ...body };
  res.status(200).send(mockUsers[userIndex]);
});

// All patch requests
app.patch("/api/users/:id", resolveUserById, (req: Request, res: Response) => {
  const { body, userIndex } = req;
  mockUsers[userIndex] = { ...mockUsers[userIndex], ...body };
  res.status(200).send(mockUsers[userIndex]);
});

// All delete requests
app.delete("/api/users/:id", resolveUserById, (req: Request, res: Response) => {
  const userIndex = req.userIndex;
  mockUsers.splice(userIndex, 1);
  res.status(200).send({ msg: "User deleted successfully" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
