import type { Metadata } from "next";
import { Suspense } from "react";
import { AllPosts } from "@/components/all-posts";
import { SubmitLoading } from "@/components/submit-loading";

export const metadata: Metadata = {
  title: "Posts",
};

interface PostsPageProps {
  searchParams: { page: number | undefined };
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const page = searchParams.page ?? 1;
  return (
    <main>
      <Suspense
        key={page}
        fallback={
          <div className="py-10">
            <SubmitLoading />
          </div>
        }
      >
        <AllPosts page={Number(page)} />
      </Suspense>
    </main>
  );
}
