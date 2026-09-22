'use client';

import { sidebarLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

function DemoLeftSidebar({ pathname }: { pathname: string }) {
  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          const href =
            link.label === 'Profile' ? `${link.route}/demo` : link.route;

          return (
            <Link
              href={href}
              key={link.label}
              className={`leftsidebar_link ${isActive ? 'bg-primary-500' : ''}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
      <div className="mt-10 px-6">
        <p className="text-light-3 text-subtle-medium px-4">Demo mode</p>
      </div>
    </section>
  );
}

function ClerkLeftSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { SignedIn, SignOutButton, useClerk } = require('@clerk/nextjs');
  const { user } = useClerk();
  if (!user) return null;

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link: any) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          return (
            <Link
              href={
                link.label === 'Profile'
                  ? `${link.route}/${user.id}`
                  : link.route
              }
              key={link.label}
              className={`leftsidebar_link ${isActive ? 'bg-primary-500' : ''}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push('/sign-in')}>
            <div className="flex cursor-pointer gap-4 p-4">
              <Image
                src="/assets/logout.svg"
                alt="logout"
                width={24}
                height={24}
              />
              <p className="text-light-2 max-lg:hidden">Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
}

function LeftSidebar() {
  const pathname = usePathname();
  if (!hasClerk) return <DemoLeftSidebar pathname={pathname} />;
  return <ClerkLeftSidebar />;
}

export default LeftSidebar;
