import express from "express";
import { signupController } from "../controllers/auth.controller.js";
import { validateReqBody } from "../validators/index.js";
import { signupSchema } from "../validators/signup.validator.js";

const authRouter = express.Router();

authRouter.post(
    "/signup", 
    validateReqBody(signupSchema), 
    signupController
);

export default authRouter;