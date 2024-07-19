import { Router, Request, Response } from "express";
import { checkSchema, validationResult } from "express-validator";
import { creatUserValidationSchema } from "../utils/validationSchemas";
import { mockUsers } from "../utils/constants";

const router = Router();

router.get(
  "/api/users",
  checkSchema(creatUserValidationSchema),
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

export default router;
