import { Router, Request, Response } from "express";
import {
  checkSchema,
  matchedData,
  validationResult,
  query,
} from "express-validator";
import { creatUserValidationSchema } from "../utils/validationSchemas";
import { mockProducts, mockUsers } from "../utils/constants";
import { resolveUserById } from "../utils/middlewares";

const router = Router();

router.get("/api/users/:id", resolveUserById, (req: Request, res: Response) => {
  const { userIndex } = req;
  const user = mockUsers[userIndex];
  if (!user) {
    return res.status(404).send({ msg: "User not found" });
  }
  res.send(user);
});

router.get(
  "/api/users",
  query("filter")
    .isString()
    .withMessage("Filter must be a string")
    .notEmpty()
    .withMessage("Filter cannot be empty")
    .isLength({ min: 3, max: 10 })
    .withMessage("Filter must be between 3 and 10 characters"),
  (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ erros: result.array() });
    }
    const {
      query: { filter, value },
    } = req;
    if (filter && value) {
      return res.send(
        mockUsers.filter((user) => user.name.includes(value.toString()))
      );
    }
    return res.send(mockUsers);
  }
);

router.post(
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
      username: "", // Provide a value for the username property
      password: "", // Provide a value for the password property
    };
    mockUsers.push(newUser);
    res.status(201).send(newUser);
  }
);
// All put requests
router.put("/api/users/:id", resolveUserById, (req: Request, res: Response) => {
  const { body, userIndex } = req;
  mockUsers[userIndex] = { id: mockUsers[userIndex].id, ...body };
  res.status(200).send(mockUsers[userIndex]);
});

// All patch requests
router.patch(
  "/api/users/:id",
  resolveUserById,
  (req: Request, res: Response) => {
    const { body, userIndex } = req;
    mockUsers[userIndex] = { ...mockUsers[userIndex], ...body };
    res.status(200).send(mockUsers[userIndex]);
  }
);

// All delete requests
router.delete(
  "/api/users/:id",
  resolveUserById,
  (req: Request, res: Response) => {
    const userIndex = req.userIndex;
    mockUsers.splice(userIndex, 1);
    res.status(200).send({ msg: "User deleted successfully" });
  }
);

export default router;
