import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className=" bg-zinc-800">
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
              <li className="px-3">
                <Link href="/parties">
                  <a className="flex items-center h-14 text-slate-50 text-lg">
                    Parties
                  </a>
                </Link>
              </li>
              <li className="px-3">
                <Link href="/scenarios">
                  <a className="flex items-center h-14 text-slate-50 text-lg">
                    Scenarios
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
