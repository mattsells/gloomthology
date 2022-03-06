import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export default function Panel({ ...rest }: Props) {
  return <div className="shadow-lg rounded-lg bg-zinc-800 p-8" {...rest} />;
}
