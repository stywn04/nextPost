import { getPostByUserId } from "@/app/actions/post.action";
import { getCurrentUserAction } from "@/app/actions/user.action";
import {
  PostUser,
  PostCount,
  PostActivity,
  PostDate,
  PostContent,
  PostOptions,
} from "@/components/post";
import Link from "next/link";
export async function UserPosts() {
  const { id } = await getCurrentUserAction();
  const posts = await getPostByUserId();
  return (
    <section className="py-10 flex flex-col gap-5">
      {posts.length < 1 && (
        <div className="py-5 text-slate-700">
          you don't have any post,{" "}
          <Link className="text-slate-400" href={"/create"}>
            create one
          </Link>
        </div>
      )}
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
            <PostContent
              post_id={post.id}
              image={post.image}
              content={post.content}
            />
            <PostActivity user_id={id} post_id={post.id} like={post.like} />
          </section>
          <section className="flex items-center justify-between text-sm text-slate-700 ml-5">
            <PostCount like={post.like.length} comment={post.comment.length} />
            <PostDate created_at={post.created_at} />
          </section>
        </div>
      ))}
    </section>
  );
}
