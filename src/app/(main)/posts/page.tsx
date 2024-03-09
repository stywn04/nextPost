import { getAllPostsAction } from "@/app/actions/post.action";
import { PostContent } from "@/components/post/content";
import { PostCount } from "@/components/post/count";
import { PostOptions } from "@/components/post/options";
import { PostActivity } from "@/components/post/post-activity";
import { PostUser } from "@/components/post/user";
import { PostDate } from "@/components/post/date";
import type { Metadata } from "next";
import { getCurrentUserAction } from "@/app/actions/user.action";

export const metadata: Metadata = {
  title: "Posts",
};

export default async function PostsPage() {
  const posts = await getAllPostsAction();
  const { id } = await getCurrentUserAction();
  return (
    <main>
      <section className="flex flex-col gap-5">
        {posts.map((post) => (
          <div key={post.id} className="p-5 border-b-[1px] border-slate-900">
            <section className="flex items-start justify-between ">
              <PostUser
                avatar={post.user?.avatar as string}
                name={post.user?.name as string}
                username={post.user?.username as string}
              />
              <PostOptions />
            </section>
            <section className="ml-5 pl-7 border-l-[1px] border-slate-900 my-2">
              <PostContent image={post.image} content={post.content} />
              <PostActivity user_id={id} post_id={post.id} like={post.like} />
            </section>
            <section className="flex items-center justify-between text-sm text-slate-700 ml-5">
              <PostCount like={post.like.length} comment={post.like.length} />
              <PostDate created_at={post.created_at} />
            </section>
          </div>
        ))}
      </section>
    </main>
  );
}
