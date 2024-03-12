import { getAllPostsAction } from "@/app/actions/post.action";
import type { Metadata } from "next";
import { PostCard } from "@/components/post/post-card";
import { Pagination } from "@/components/pagination";

export const metadata: Metadata = {
  title: "Posts",
};

interface PostsPageProps {
  searchParams: { page: number | undefined };
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const page = searchParams.page ?? 1;
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
