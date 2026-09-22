import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import PostThread from '@/components/forms/PostThread';
import { fetchUser } from '@/lib/actions/user.actions';

const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

async function Page() {
  if (!hasClerk) {
    return (
      <>
        <h1 className="head-text">Create Thread</h1>
        <p className="mt-4 text-light-3 text-base-regular">
          Demo mode: composing is shown for UI only. Database writes stay
          disabled until <code>ALLOW_LIVE_DB=true</code> and Mongo credentials
          are configured with a least-privilege user.
        </p>
        <div className="mt-6 rounded-xl bg-dark-2 p-6 text-light-2">
          <p className="text-small-regular text-gray-1 mb-2">Preview composer</p>
          <textarea
            disabled
            className="no-focus w-full rounded-lg bg-dark-3 p-4 text-light-1 outline-none"
            rows={5}
            placeholder="What is happening?!"
          />
          <button
            disabled
            className="mt-4 rounded-full bg-primary-500 px-6 py-2 text-light-1 opacity-60"
          >
            Post (disabled in demo)
          </button>
        </div>
      </>
    );
  }

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect('/onboarding');
  return (
    <>
      <h1 className="head-text">Create Thread</h1>
      <PostThread userId={userInfo._id} />
    </>
  );
}

export default Page;
