import {
  getAllPostCommentAction,
  getPostByIdAction,
} from "@/app/actions/post.action";
import { PostUser } from "@/components/post/user";
import { PostOptions } from "@/components/post/options";
import { PostContent } from "@/components/post/content";
import { PostActivity } from "@/components/post/post-activity";
import { PostCount } from "@/components/post/count";
import { PostDate } from "@/components/post/date";
import { getCurrentUserAction } from "@/app/actions/user.action";
import { CommentForm } from "@/components/comment/comment-form";
import { DateTime } from "luxon";

interface PostPageProps {
  params: { id: string };
}
export default async function PostPage({ params }: PostPageProps) {
  const { id } = params;
  const post = await getPostByIdAction(id);
  const { id: user_id } = await getCurrentUserAction();
  const comments = await getAllPostCommentAction(post.id);
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
      <div>
        {comments.map((comment) => (
          <div key={comment.id} className="p-5 border-b-[1px] border-slate-900">
            <section className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img src={comment.user?.avatar} alt={comment.user?.username} />
              </div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-slate-200">
                  {comment.user?.name}
                </h4>
                &bull;
                <p className="font-light text-slate-700">
                  @{comment.user?.username}
                </p>
              </div>
            </section>
            <section className="pl-10 py-2 whitespace-pre-line">
              <p>{comment.content}</p>
            </section>
            <section className="text-sm text-slate-700 flex justify-end mt-2">
              <span>{DateTime.fromISO(comment.created_at).toRelative()}</span>
            </section>
          </div>
        ))}
      </div>
    </main>
  );
}
