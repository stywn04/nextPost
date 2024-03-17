"use server";

import {
  LoginType,
  RegisterType,
  UpdateUserType,
  loginSchema,
  registerSchema,
  updateUserSchema,
} from "@/libs/schema/auth.schema";
import { createClient } from "@/libs/supabase/server";
import {
  findUserByEmail,
  findUserByUsername,
  getCurrentUserAction,
} from "./user.action";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function registerAction(fields: RegisterType) {
  const validatedFields = registerSchema.safeParse(fields);
  if (!validatedFields.success) {
    return { isError: true, message: "Invalid fields!" };
  }

  const supabase = createClient();
  const { username, name, email, password } = validatedFields.data;

  const usernameExist = await findUserByUsername(username);
  if (usernameExist) {
    return { isError: true, message: "Username already exist!" };
  }
  const emailExist = await findUserByEmail(email);

  if (emailExist) {
    return { isError: true, message: "Email already registered!" };
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
    return { isError: true, message: error.message };
  }

  return { isError: false, message: "Registered successfully!" };
}

export async function loginAction(fields: LoginType) {
  const validatedFields = loginSchema.safeParse(fields);
  if (!validatedFields.success) {
    return { isError: true, message: "Invalid fields!" };
  }

  const supabase = createClient();
  const { email, password } = validatedFields.data;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { isError: true, message: error.message };
  }

  return { isError: false, message: "Successfully loged in!" };
}

export async function logoutAction() {
  const supabase = createClient();

  await supabase.auth.signOut();

  redirect("/auth/login");
}

export async function updateUserAction(fields: UpdateUserType, avatar: string) {
  const validatedFields = updateUserSchema.safeParse(fields);
  if (!validatedFields.success) {
    throw Error("Invalid fields!");
  }
  const supabase = createClient();
  const { id, username: currentUsername } = await getCurrentUserAction();
  const { username } = validatedFields.data;

  const usernameExist = await findUserByUsername(validatedFields.data.username);
  if (usernameExist && currentUsername !== username) {
    throw Error("Username already in used.");
  }
  const { error } = await supabase.auth.updateUser({
    data: { ...validatedFields.data, avatar },
  });
  const { error: updateUserError } = await supabase
    .from("user")
    .update({ ...validatedFields.data, avatar })
    .eq("id", id);

  if (error) {
    throw Error(error.message);
  }
  if (updateUserError) {
    throw Error(updateUserError.message);
  }
  revalidatePath("/profile");
}
