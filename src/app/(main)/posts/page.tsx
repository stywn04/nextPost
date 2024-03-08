import { getAllPostsAction } from "@/app/actions/post.action";
import { Heart, MoreHorizontal, MessageSquare } from "lucide-react";
import { DateTime } from "luxon";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts",
};

export default async function PostsPage() {
  const posts = await getAllPostsAction();
  return (
    <main>
      <section className="flex flex-col gap-5">
        {posts.map((post) => (
          <div key={post.id} className="p-5 border-b-[1px] border-slate-900">
            <section className="flex items-start justify-between ">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={post.user?.avatar}
                    alt={post.user?.name}
                    className="w-full h-full object cover"
                  />
                </div>
                <div className="flex flex-col ">
                  <h3 className="text-slate-200 font-semibold">
                    {post.user?.name}
                  </h3>
                  <p className="text-slate-700 font-light">
                    @{post.user?.username}
                  </p>
                </div>
              </div>
              <div>
                <MoreHorizontal />
              </div>
            </section>
            <section className="ml-5 pl-7 border-l-[1px] border-slate-900 my-2">
              {post.image ? (
                <img
                  src={post.image}
                  alt={post.content}
                  className="w-full h-full rounded-md"
                />
              ) : null}
              <div className="py-5">{post.content}</div>
              <div className="flex items-center gap-2">
                <button>
                  <Heart />
                </button>
                <button>
                  <MessageSquare />
                </button>
              </div>
            </section>
            <section className="flex items-center justify-between text-sm text-slate-700 ml-5">
              <div>
                {post.like.length > 0 && <span>{post.like.length} likes</span>}
                {post.like.length > 0 && post.comment.length > 0 && (
                  <span>&nbsp;&bull;&nbsp;</span>
                )}
                {post.comment.length > 0 && (
                  <span>{post.comment.length} comments</span>
                )}
              </div>
              <div className="flex justify-end">
                <span>{DateTime.fromISO(post.created_at).toRelative()}</span>
              </div>
            </section>
          </div>
        ))}
      </section>
    </main>
  );
}
