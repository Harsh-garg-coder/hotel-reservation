import { BadRequestError } from "../utils/errors/app.error.js";
import { findUserByEmail } from "./user.service.js"

export const signupService = async (signupData) => {
    // check if the email is already present or not
    const user = await findUserByEmail(signupData.email);

    throw new BadRequestError("User is already present");
    // if(user) {
        
    // }
    // if email is present return response according to that
    // if email is not present then create a user
        // hash password
        // create user  
}