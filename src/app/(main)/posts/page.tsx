import { getAllPostsAction } from "@/app/actions/post.action";
import type { Metadata } from "next";
import { PostCard } from "@/components/post";

export const metadata: Metadata = {
  title: "Posts",
};

export default async function PostsPage() {
  const posts = await getAllPostsAction();
  return (
    <main>
      <section className="flex flex-col gap-5">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </main>
  );
}
