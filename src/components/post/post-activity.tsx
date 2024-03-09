"use client";
import { likePostAction } from "@/app/actions/post.action";
import { Heart, MessageSquare } from "lucide-react";
import { useTransition } from "react";
import { SubmitLoading } from "../submit-loading";

interface PostActivityProps {
  post_id: string;
  user_id: string;
  like: { id: string; user_id: string }[];
}
export function PostActivity({ post_id, user_id, like }: PostActivityProps) {
  const [isPending, setTransition] = useTransition();
  async function likeHandler() {
    setTransition(async () => {
      await likePostAction({ post_id, like });
    });
  }
  return (
    <div className="flex items-center gap-2">
      {isPending ? (
        <SubmitLoading />
      ) : (
        <button disabled={isPending} onClick={likeHandler}>
          {like.find((l) => l.user_id === user_id) ? (
            <Heart fill="red" color="red" />
          ) : (
            <Heart />
          )}
        </button>
      )}
      <button>
        <MessageSquare />
      </button>
    </div>
  );
}
