"use server";

import { createClient } from "@/libs/supabase/server";

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
