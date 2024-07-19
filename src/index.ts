import express, { NextFunction, Request, Response } from "express";
import {
  query,
  validationResult,
  body,
  matchedData,
  checkSchema,
} from "express-validator";
import { creatUserValidationSchema } from "./utils/validationSchemas";
import usersRouter from "./routes/users";
import { mockUsers } from "./utils/constants";

const app = express();
app.use(express.json());
app.use(usersRouter);

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

// app.get(
//   "/api/users",
//   checkSchema(creatUserValidationSchema),
//   (req: Request, res: Response) => {
//     const result = validationResult(req);
//     console.log(result);
//     const {
//       query: { filter, value },
//     } = req;
//     if (filter && value) {
//       return res.send(
//         mockUsers.filter((user) => user.name.includes(value.toString()))
//       );
//     }
//     return res.send(mockUsers);
//   }
// );

app.use(loggingMiddleware, (req, res, next) => {
  console.log("Finished logging");
  next();
});

app.get("/api/users/:id", resolveUserById, (req: Request, res: Response) => {
  const { userIndex } = req;
  const user = mockUsers[userIndex];
  if (!user) {
    return res.status(404).send({ msg: "User not found" });
  }
  res.send(user);
});

app.get("/api/products", (req: Request, res: Response) => {
  res.send(mockProducts);
});

// All post requests
app.post(
  "/api/users",
  checkSchema(creatUserValidationSchema),
  (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ erros: result.array() });
    }
    const data = matchedData(req);
    console.log(data);
    // console.log(req.body);
    const newUser = {
      id: mockUsers[mockUsers.length - 1].id + 1,
      name: data.name,
      marks: data.marks,
    };
    mockUsers.push(newUser);
    res.status(201).send(newUser);
  }
);

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
