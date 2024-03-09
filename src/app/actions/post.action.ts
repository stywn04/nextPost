"use server";

import { createClient } from "@/libs/supabase/server";
import { getCurrentUserAction } from "./user.action";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

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

interface LikePostActionArgs {
  post_id: string;
  like: { id: string; user_id: string }[];
}
export async function likePostAction({ post_id, like }: LikePostActionArgs) {
  const supabase = createClient();
  const { id } = await getCurrentUserAction();

  const userExist = like.find((l) => l.user_id === id);

  userExist
    ? await supabase.from("like").delete().eq("id", userExist.id)
    : await supabase.from("like").insert({ user_id: id, post_id });

  revalidatePath("/posts");
}

export async function getPostByIdAction(id: string) {
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
    .eq("id", id)
    .limit(1)
    .single();

  if (error) {
    throw Error(error.message);
  }

  if (!data) {
    return notFound();
  }

  return data;
}
