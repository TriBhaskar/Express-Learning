import { NextFunction, Request, Response } from "express";
import { mockUsers } from "./constants";
export const resolveUserById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
