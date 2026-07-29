import z from "zod";

export const signupSchema =  z.object({
    email: z.email(),
    password: z.string().min(4, "Min password length is 4!"),
    name: z.string().min(3, "Min name length is 3")
});