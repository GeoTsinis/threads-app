import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import ThreadCard from '@/components/cards/ThreadCard';
import Pagination from '@/components/shared/Pagination';

import { fetchPosts } from '@/lib/actions/thread.actions';
import { fetchUser } from '@/lib/actions/user.actions';

const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

const demoPosts = [
  {
    _id: 'demo-1',
    parentId: null,
    text: 'Welcome to Threads — this portfolio deploy runs in demo mode with sample posts while auth and database keys are offline.',
    author: {
      id: 'demo-user',
      name: 'Geo Demo',
      image: '/assets/user.svg',
    },
    community: null,
    createdAt: new Date().toISOString(),
    children: [],
  },
  {
    _id: 'demo-2',
    parentId: null,
    text: 'Build communities, share threads, and reply in nested conversations. Connect Clerk + MongoDB to unlock the full experience.',
    author: {
      id: 'demo-user-2',
      name: 'Builder',
      image: '/assets/user.svg',
    },
    community: null,
    createdAt: new Date().toISOString(),
    children: [],
  },
];

async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  if (!hasClerk) {
    return (
      <>
        <h1 className="head-text text-left">Home</h1>
        <p className="mt-2 text-light-3 text-base-regular">
          Demo feed — add Clerk and MongoDB credentials for live data.
        </p>

        <section className="mt-9 flex flex-col">
          {demoPosts.map((post) => (
            <div className="mt-4" key={post._id}>
              <ThreadCard
                id={post._id}
                currentUserId="demo"
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />
            </div>
          ))}
        </section>
      </>
    );
  }

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');

  let result = { posts: [] as any[], isNext: false };
  try {
    result = await fetchPosts(
      searchParams.page ? +searchParams.page : 1,
      30
    );
  } catch {
    result = { posts: demoPosts as any[], isNext: false };
  }

  return (
    <>
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-col">
        {result.posts.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
          <>
            {result.posts.map((post: any) => (
              <div className="mt-4" key={post._id}>
                <ThreadCard
                  id={post._id}
                  currentUserId={user.id}
                  parentId={post.parentId}
                  content={post.text}
                  author={post.author}
                  community={post.community}
                  createdAt={post.createdAt}
                  comments={post.children}
                />
              </div>
            ))}
          </>
        )}
      </section>

      <Pagination
        path="/"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </>
  );
}

export default Home;
