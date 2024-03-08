import { createClient } from "@/libs/supabase/client";

export async function uploadImage(image: File) {
  if (!image) {
    throw Error("image not found!");
  }
  const supabase = createClient();
  const { error } = await supabase.storage
    .from("supapost")
    .upload(`/post/${image.name}`, image);

  if (error) {
    throw Error(error.message);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("supapost").getPublicUrl(`/post/${image.name}`);

  return publicUrl;
}
