import { Router, Request, Response } from "express";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { creatUserValidationSchema } from "../utils/validationSchemas";
import { mockUsers } from "../utils/constants";

const router = Router();

router.get(
  "/api/users",
  checkSchema({
    filter: {
      in: ["query"],
      isString: {
        errorMessage: "Filter must be a string",
      },
      notEmpty: {
        errorMessage: "Filter cannot be empty",
      },
      isLength: {
        options: {
          min: 3,
          max: 10,
        },
        errorMessage: "Filter should be a string with length between 3 and 10",
      },
    },
    value: {
      in: ["query"],
      isString: {
        errorMessage: "Value must be a string",
      },
      notEmpty: {
        errorMessage: "Value cannot be empty",
      },
    },
  }),
  (req: Request, res: Response) => {
    const result = validationResult(req);
    console.log(result);
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
    result.mapped();
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

export default router;
