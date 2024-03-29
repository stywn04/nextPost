import { getCurrentUserAction } from "@/app/actions/user.action";
import { ButtonUpdateUser } from "@/components/auth/update-user";
import { SubmitLoading } from "@/components/submit-loading";
import { UserPosts } from "@/components/user-posts";
import { Suspense } from "react";

export async function generateMetadata() {
  const { username, name } = await getCurrentUserAction();

  return {
    title: `${name} • @${username}`,
  };
}

interface ProfilePageProps {
  searchParams: { page: number | undefined };
}

export default async function ProfilePage({ searchParams }: ProfilePageProps) {
  const page = searchParams.page ?? 1;
  const user = await getCurrentUserAction();
  return (
    <main>
      <section className="grid grid-cols-12 gap-4 justify-between items-start">
        <div className="col-span-8">
          <h1 className="font-bold text-xl">{user.name}</h1>
          <p className="text-slate-700">@{user.username}</p>
          <div className="whitespace-pre-line mt-10">
            <span>{user.bio}</span>
          </div>
        </div>
        <div className="col-span-4 flex justify-end ">
          <div className="w-28 w-28 rounded-full overflow-hidden">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
      <ButtonUpdateUser
        avatar={user.avatar}
        name={user.name}
        username={user.username}
        bio={user.bio}
      />
      <Suspense
        key={page}
        fallback={
          <div className="py-10">
            <SubmitLoading />
          </div>
        }
      >
        <UserPosts page={page} />
      </Suspense>
    </main>
  );
}
