import { signupService } from "../services/auth.service.js"

export const signupController = async (req, res) => {
    await signupService(req.body);

    res.status(201).json({
        message: "User created successfully!"
    });
}