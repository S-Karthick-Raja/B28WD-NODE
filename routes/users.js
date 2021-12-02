import express from "express";
import { genPassword } from "../helper.js";
const router = express.Router();

router.route("/signup").post(async (request, response) => {
  const { username, password } = request.body;

  const hashedPassword = await genPassword(password);
  response.send({ username, password: hashedPassword });
});

export const userRouter = router;
