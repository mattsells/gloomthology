import { ReactElement, ReactNode } from 'react';
import classnames, { display, flexDirection } from 'tailwindcss-classnames';

const styles = {
  root: (className: any) =>
    classnames(display('flex'), flexDirection('flex-col'), className),
};

type Props = {
  children: ReactNode;
  className?: string;
};

export default function VStack({
  children,
  className,
}: Props): ReactElement<Props> {
  return <div className={styles.root(className)}>{children}</div>;
}
