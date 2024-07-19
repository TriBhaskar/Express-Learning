import { Router, Request, Response } from "express";
import { mockProducts } from "../utils/constants";

const router = Router();

router.get("/api/products", (req: Request, res: Response) => {
  res.send(mockProducts);
});

export default router;
