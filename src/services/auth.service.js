import { addEmailToQueue } from "../producers/mailer.producer.js";
import { ConflictError } from "../utils/errors/app.error.js";
import { createUserService, findUserByEmail } from "./user.service.js"
import bcrypt from "bcrypt";

export const signupService = async (signupData) => {
    const { email, password, name } = signupData;
    const user = await findUserByEmail(email);

    if(user) {
        throw new ConflictError("User is already present");
    } else {
        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = await createUserService({
            email,
            password: hashedPassword,
            name
        });
        await addEmailToQueue({
            to: email,
            templateId: "welcome",
            subject: "Welcome to Hotel Reservation!",
            params: {
                name,
                appName: "Hotel Reservation"
            }
        });
        return newUser;
    }
}