"use server";

import { createClient } from "@/libs/supabase/server";
import { redirect } from "next/navigation";

export async function findUserByEmail(email: string) {
  const supabase = createClient();
  const { data: emailExist } = await supabase
    .from("user")
    .select("email")
    .eq("email", email)
    .limit(1)
    .single();

  return emailExist;
}

export async function findUserByUsername(username: string) {
  const supabase = createClient();
  const { data: usernameExist } = await supabase
    .from("user")
    .select("email")
    .eq("username", username)
    .limit(1)
    .single();

  return usernameExist;
}

export async function getCurrentUserAction() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: currentUser } = await supabase
    .from("user")
    .select("*")
    .eq("id", user.id)
    .limit(1)
    .single();

  if (!currentUser) {
    redirect("/auth/login");
  }

  return currentUser;
}
