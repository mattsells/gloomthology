import { ReactNode } from 'react';
import {
  backgroundColor,
  borderRadius,
  boxShadow,
  classnames,
  maxWidth,
  padding,
  width,
} from 'tailwindcss-classnames';

type Size = 'medium' | 'full';

type Props = {
  className?: string;
  children?: ReactNode;
  size?: Size;
};

const styles = {
  root: (className: any, size: Size) =>
    classnames(
      boxShadow('shadow'),
      maxWidth({ 'max-w-2xl': size === 'medium' }),
      borderRadius('rounded-lg'),
      backgroundColor('bg-zinc-800'),
      padding('p-8'),
      width('w-full'),
      className
    ),
};

export default function Panel({ className, size = 'full', ...rest }: Props) {
  return <div className={styles.root(className, size)} {...rest} />;
}
