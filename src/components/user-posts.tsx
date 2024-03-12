import { getPostByUserId } from "@/app/actions/post.action";
import { PostCard } from "@/components/post";
import Link from "next/link";
import { Pagination } from "./pagination";
export async function UserPosts({ page }: { page: number }) {
  const { data: posts, totalPages } = await getPostByUserId(page);
  return (
    <div>
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
          <PostCard post={post} key={post.id} />
        ))}
      </section>
      <Pagination page={Number(page)} totalPages={Number(totalPages)} />
    </div>
  );
}
