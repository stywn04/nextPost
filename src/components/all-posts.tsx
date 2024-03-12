import { PostCard } from "./post";
import { Pagination } from "./pagination";
import { getAllPostsAction } from "@/app/actions/post.action";
export async function AllPosts({ page }: { page: number }) {
  const { totalPages, data: posts } = await getAllPostsAction(page);
  return (
    <main>
      <section className="flex flex-col gap-5">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
      <Pagination page={Number(page)} totalPages={Number(totalPages)} />
    </main>
  );
}
