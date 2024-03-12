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
    .range(0, 1)
    .order("created_at", { ascending: false });

  if (!data) {
    throw error.message;
  }

  return data;
}

interface LikePostActionArgs {
  post_id: string;
  like: { id: string; user_id: string }[];
  pathname: string;
}
export async function likePostAction({
  post_id,
  like,
  pathname,
}: LikePostActionArgs) {
  const supabase = createClient();
  const { id } = await getCurrentUserAction();

  const userExist = like.find((l) => l.user_id === id);

  userExist
    ? await supabase.from("like").delete().eq("id", userExist.id)
    : await supabase.from("like").insert({ user_id: id, post_id });

  revalidatePath(pathname);
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

export type PostType = Awaited<ReturnType<typeof getPostByIdAction>>;

export async function commentAction(post_id: string, content: string) {
  const supabase = createClient();
  const { id } = await getCurrentUserAction();

  if (content.length < 1) {
    throw Error("Cannot submit empty comment!");
  }

  const { error } = await supabase.from("comment").insert({
    content,
    post_id,
    user_id: id,
  });
  if (error) {
    throw Error(error.message);
  }

  revalidatePath(`/post/${post_id}`);
}

export async function getAllPostCommentAction(post_id: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("comment")
    .select(`*,user(username,name,avatar)`)
    .eq("post_id", post_id)
    .order("created_at", { ascending: false });

  if (error) {
    throw Error(error.message);
  }

  return data;
}

export async function getPostByUserId() {
  const { id: user_id } = await getCurrentUserAction();
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
    .eq("user_id", user_id)
    .order("created_at", { ascending: false });

  if (error) {
    throw Error(error.message);
  }

  return data;
}

export async function searchPostByQueryAction(query: string) {
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
    .textSearch("content", query)
    .order("created_at", { ascending: false });

  if (error) {
    throw Error(error.message);
  }

  return data;
}
