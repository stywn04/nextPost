"use server";

import { createClient } from "@/libs/supabase/server";
import { getCurrentUserAction } from "./user.action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function submitPostAction(content: string, image: null | string) {
  const supabase = createClient();
  const { id } = await getCurrentUserAction();
  const { error } = await supabase.from("post").insert({
    content,
    user_id: id,
    image,
  });

  if (error) {
    throw Error(error.message);
  }

  revalidatePath("/posts");
  redirect("/posts");
}

export async function getAllPostsAction() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("post")
    .select(
      `
    *,
    user(name,username,avatar),
    like(id,user_id),
    comment(content,user(name,username,avatar))
  `,
    )
    .order("created_at", { ascending: false });

  if (!data) {
    throw error.message;
  }

  return data;
}
