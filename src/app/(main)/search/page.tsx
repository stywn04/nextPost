import { searchPostByQueryAction } from "@/app/actions/post.action";
import { Search } from "lucide-react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  PostUser,
  PostCount,
  PostActivity,
  PostDate,
  PostContent,
  PostOptions,
} from "@/components/post";
import { getCurrentUserAction } from "@/app/actions/user.action";

export const metadata: Metadata = {
  title: "Search",
};

interface SearchPageProps {
  searchParams: { query: string | undefined };
}
export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.query ?? "";
  const posts = await searchPostByQueryAction(query);
  const { id } = await getCurrentUserAction();
  async function searchQuery(formData: FormData) {
    "use server";
    const query = String(formData.get("query"));
    if (query.length < 1) {
      return;
    }
    redirect(`/search?query=${query}`);
  }
  return (
    <main>
      <form
        action={searchQuery}
        className="border border-slate-700 rounded-md "
      >
        <fieldset className="px-5 flex items-center justify-between">
          <input
            name="query"
            placeholder="search"
            type="text"
            className="w-full py-2 bg-transparent outline-none"
          />
          <button>
            <Search />
          </button>
        </fieldset>
      </form>
      <section className="py-5">
        {posts && posts.length < 1 && (
          <span>sorry can't find what you looking for.</span>
        )}
      </section>

      <section className="flex flex-col gap-5 py-5">
        {posts &&
          posts.map((post) => (
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
                <PostCount
                  like={post.like.length}
                  comment={post.comment.length}
                />
                <PostDate created_at={post.created_at} />
              </section>
            </div>
          ))}
      </section>
    </main>
  );
}
