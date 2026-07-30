import express from "express";
import { loginController, refreshController, signupController } from "../controllers/auth.controller.js";
import { validateReqBody } from "../validators/index.js";
import { signupSchema } from "../validators/signup.validator.js";
import { loginSchema } from "../validators/login.validator.js";

const authRouter = express.Router();

authRouter.post(
    "/signup", 
    validateReqBody(signupSchema), 
    signupController
);

authRouter.post(
    "/login",
    validateReqBody(loginSchema),
    loginController
);

authRouter.post(
    "/refresh",
    refreshController
);

export default authRouter;