import { ReactElement, ReactNode } from 'react';

import Navbar from './Navbar';

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props): ReactElement {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
