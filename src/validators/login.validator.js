import z from "zod";

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(4, "Min password length is 4!").max(72, "Max password length is 72!"),
});