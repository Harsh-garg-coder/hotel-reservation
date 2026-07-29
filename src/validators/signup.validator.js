import z from "zod";

export const signupSchema =  z.object({
    email: z.email().max(255),
    password: z.string().min(4, "Min password length is 4!").max(72, "Max password length is 72!"),
    name: z.string().min(3, "Min name length is 3").max(255, "Max name length is 255")
});
