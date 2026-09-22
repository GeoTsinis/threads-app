'use client';

import Image from 'next/image';
import Link from 'next/link';

const hasClerk = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

function DemoTopbar() {
  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/assets/logo.svg" alt="logo" width={20} height={20} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">Threads</p>
      </Link>
      <p className="text-light-3 text-small-regular">Demo mode</p>
    </nav>
  );
}

function ClerkTopbar() {
  const {
    OrganizationSwitcher,
    SignedIn,
    SignOutButton,
  } = require('@clerk/nextjs');
  const { dark } = require('@clerk/themes');

  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/assets/logo.svg" alt="logo" width={20} height={20} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">Threads</p>
      </Link>

      <div className="flex-items items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>

        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: 'py-4 px-4',
            },
          }}
        />
      </div>
    </nav>
  );
}

function Topbar() {
  if (!hasClerk) return <DemoTopbar />;
  return <ClerkTopbar />;
}

export default Topbar;
