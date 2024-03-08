import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Name too short, min 3 chars!"),
  username: z.string().min(2, "Username too short, min 2 chars!"),
  email: z.string().email("Invalid email!"),
  password: z.string().min(6, "Password too short, min 6 chars!"),
});

export type RegisterType = z.infer<typeof registerSchema>;
