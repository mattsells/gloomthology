import { ReactElement, ReactNode } from 'react';

import Navbar from './Navbar';

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props): ReactElement {
  return (
    <>
      <Navbar />
      <main className="bg-zinc-700 py-10 grow">
        <div className="container mx-auto">{children}</div>
      </main>
    </>
  );
}
