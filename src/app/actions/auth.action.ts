"use server";

import { RegisterType, registerSchema } from "@/libs/schema/auth.schema";
import { createClient } from "@/libs/supabase/server";
import { findUserByEmail, findUserByUsername } from "./user.action";

export async function registerAction(fields: RegisterType) {
  const validatedFields = registerSchema.safeParse(fields);
  if (!validatedFields.success) {
    throw Error("Invalid fields!");
  }

  const supabase = createClient();
  const { username, name, email, password } = validatedFields.data;

  const usernameExist = await findUserByUsername(username);
  if (usernameExist) {
    throw Error("Username already exist!");
  }
  const emailExist = await findUserByEmail(email);

  if (emailExist) {
    throw Error("Email already registered!");
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        username,
        email,
        bio: "no bio yet!",
        avatar: `https://ui-avatars.com/api/?name=${name}`,
      },
    },
  });

  if (error) {
    throw Error(error.message);
  }
}
