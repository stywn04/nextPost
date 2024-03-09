import { getPostByIdAction } from "@/app/actions/post.action";
import { PostUser } from "@/components/post/user";
import { PostOptions } from "@/components/post/options";
import { PostContent } from "@/components/post/content";
import { PostActivity } from "@/components/post/post-activity";
import { PostCount } from "@/components/post/count";
import { PostDate } from "@/components/post/date";
import { getCurrentUserAction } from "@/app/actions/user.action";
import { CommentForm } from "@/components/comment/comment-form";

interface PostPageProps {
  params: { id: string };
}
export default async function PostPage({ params }: PostPageProps) {
  const { id } = params;
  const post = await getPostByIdAction(id);
  const { id: user_id } = await getCurrentUserAction();
  return (
    <main>
      <div key={post.id} className="pb-5 border-b-[1px] border-slate-900">
        <section className="flex items-start justify-between ">
          <PostUser
            avatar={post.user?.avatar as string}
            name={post.user?.name as string}
            username={post.user?.username as string}
          />
          <PostOptions />
        </section>
        <section className="my-2">
          <PostContent image={post.image} content={post.content} />
          <PostActivity user_id={user_id} post_id={post.id} like={post.like} />
        </section>
        <section className="flex items-center justify-between text-sm text-slate-700 ">
          <PostCount like={post.like.length} comment={post.comment.length} />
          <PostDate created_at={post.created_at} />
        </section>
      </div>

      <div className="border-b-[1px] border-slate-900 p-5">
        <CommentForm post_id={post.id} />
      </div>
    </main>
  );
}
