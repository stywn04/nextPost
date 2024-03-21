import {
  getAllPostCommentAction,
  getPostByIdAction,
} from "@/app/actions/post.action";
import {
  PostUser,
  PostCount,
  PostActivity,
  PostDate,
  PostOptions,
} from "@/components/post";
import { getCurrentUserAction } from "@/app/actions/user.action";
import {
  CommentForm,
  CommentContent,
  CommentUser,
  CommentDate,
} from "@/components/comment";
import { CommentCard } from "@/components/comment/comment-card";
import { Suspense } from "react";
import Loading from "../../loading";
import { Comments } from "@/components/comments";

export async function generateMetadata({ params }: PostPageProps) {
  const { id } = params;
  const { user, content } = await getPostByIdAction(id);
  return {
    title: `@${user?.username} : ${content}`,
  };
}

interface PostPageProps {
  params: { id: string };
  searchParams: { page: number | undefined };
}
export default async function PostPage({
  params,
  searchParams,
}: PostPageProps) {
  const { id } = params;
  const { id: user_id } = await getCurrentUserAction();
  const page = searchParams.page ?? 1;
  const post = await getPostByIdAction(id);
  return (
    <main>
      <div key={post.id} className="pb-5 border-b-[1px] border-slate-900">
        <section className="flex items-start justify-between ">
          <PostUser
            avatar={post.user?.avatar as string}
            name={post.user?.name as string}
            username={post.user?.username as string}
          />
          <PostOptions
            post_id={post.id}
            user_id={post.user_id}
            current_user_id={user_id}
          />
        </section>
        <section className="my-2">
          <div className="py-5 whitespace-pre-line">
            {post.image ? (
              <img
                src={post.image}
                alt={post.content}
                className="w-full h-full rounded-md mb-2"
              />
            ) : null}
            <p>{post.content}</p>
          </div>
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
      <Suspense
        key={page}
        fallback={
          <div className="py-10">
            <Loading />
          </div>
        }
      >
        <Comments id={id} page={Number(page)} />
      </Suspense>
    </main>
  );
}
