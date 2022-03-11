import Link from 'next/link';

import useSession from '@/hooks/useSession';
import http, { Routes } from '@/lib/http';

export default function Navbar() {
  const { isLoggedIn, setUser } = useSession();

  // TODO: Use proper typing
  const handleLogOut = async (e: any) => {
    e.preventDefault();
    await http.delete(Routes.Sessions);
    setUser(null);
  };

  return (
    <nav className="bg-zinc-800">
      <div className="container mx-auto">
        <div className="h-14">
          <div className="flex justify-between">
            <div className="grow">
              <Link href="/">
                <a className="flex items-center h-14 inline-block text-slate-50 text-2xl">
                  Gloomthology
                </a>
              </Link>
            </div>

            <ul className="flex row">
              {isLoggedIn && (
                <>
                  <li className="px-3">
                    <Link href="/campaigns">
                      <a className="flex items-center h-14 text-slate-50 text-lg">
                        Campaigns
                      </a>
                    </Link>
                  </li>

                  <li className="px-3">
                    <a
                      className="flex items-center h-14 text-slate-50 text-lg"
                      href="/logout"
                      onClick={handleLogOut}
                    >
                      Log Out
                    </a>
                  </li>
                </>
              )}

              {!isLoggedIn && (
                <>
                  <li className="px-3">
                    <Link href="/signup">
                      <a className="flex items-center h-14 text-indigo-500 text-lg">
                        Sign Up
                      </a>
                    </Link>
                  </li>

                  <li className="px-3">
                    <Link href="/login">
                      <a className="flex items-center h-14 text-slate-50 text-lg">
                        Log In
                      </a>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
