"use client";
import { MoreHorizontal } from "lucide-react";
import { useState, useRef, useEffect, useTransition } from "react";
import { Edit, Trash, Save } from "lucide-react";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { deletePostAction } from "@/app/actions/post.action";
import { SubmitLoading } from "../submit-loading";
interface PostOptionsProps {
  post_id: string;
  user_id: string;
  current_user_id: string;
}
export function PostOptions({
  post_id,
  user_id,
  current_user_id,
}: PostOptionsProps) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const isAllowed = user_id === current_user_id;
  useEffect(() => {
    function closeDropdown(e: any) {
      if (
        !btnRef.current?.contains(e.target) &&
        !listRef.current?.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.body.addEventListener("click", closeDropdown);
    return () => document.body.removeEventListener("click", closeDropdown);
  }, []);
  return (
    <div className="relative">
      <button
        ref={btnRef}
        onClick={() => {
          setOpen(!open);
        }}
        className="cursor-pointer hover:bg-slate-900 rounded-full"
      >
        <MoreHorizontal />
      </button>
      {open && (
        <div className="absolute -bottom-32 right-0 " ref={listRef}>
          <Options post_id={post_id} isAllowed={isAllowed} />
        </div>
      )}
    </div>
  );
}
interface OptionsProps {
  isAllowed: boolean;
  post_id: string;
}
function Options({ isAllowed, post_id }: OptionsProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, setTransition] = useTransition();

  async function deleteHandler() {
    if (!isAllowed) return;

    setTransition(async () => {
      try {
        const status = await deletePostAction(post_id, pathname);
        if (status.isError) {
          toast.error(status.message);
          return;
        }
        toast.success(status.message);
        if (pathname.startsWith("/post")) {
          router.push("/posts");
        }
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      }
    });
  }

  return (
    <div className="w-28 p-1 rounded-md bg-slate-950 border border-slate-900 flex flex-col items-stretch gap-2 animate-down">
      <button
        onClick={() => {
          toast.success("save");
        }}
        className="flex items-center gap-1 py-1 px-2 hover:bg-white/5 rounded"
      >
        <Save size={16} />
        Save
      </button>
      <button
        disabled={isPending || !isAllowed}
        onClick={() => {
          toast.success("edit");
        }}
        className={`flex items-center gap-1 py-1 px-2 hover:bg-white/5 rounded ${
          !isAllowed && "text-slate-700"
        }`}
      >
        <Edit size={16} />
        Edit
      </button>
      <button
        disabled={isPending || !isAllowed}
        onClick={deleteHandler}
        className={`flex items-center gap-1 py-1 px-2 hover:bg-white/5 rounded ${
          !isAllowed && "text-slate-700 w-full"
        }`}
      >
        {isPending ? (
          <div className="w-full flex items-center justify-center">
            <SubmitLoading />
          </div>
        ) : (
          <span className="flex items-center gap-1">
            <Trash size={16} />
            Delete
          </span>
        )}
      </button>
    </div>
  );
}
