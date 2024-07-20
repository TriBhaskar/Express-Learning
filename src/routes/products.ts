import { Router, Request, Response } from "express";
import { mockProducts } from "../utils/constants";

const router = Router();

router.get("/api/products", (req: Request, res: Response) => {
  console.log(req.headers.cookie);
  console.log(req.cookies);
  console.log(req.signedCookies.hello);
  if (req.signedCookies["hello"] && req.signedCookies["hello"] === "world") {
    return res.send(mockProducts);
  }
  return res.status(401).send({ msg: "Sorry you need the correct cookie" });
});

export default router;
