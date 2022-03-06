import { ReactElement } from 'react';
import {
  backgroundColor,
  borderRadius,
  classnames,
  padding,
  textColor,
  transitionProperty,
} from 'tailwindcss-classnames';

type Appearance = 'primary';
type Type = 'button' | 'submit' | 'reset' | undefined;

type Props = React.HTMLProps<HTMLButtonElement> & {
  appearance?: Appearance;
  type?: Type;
};

const styles = {
  root: (className: any, appearance: Appearance) => {
    const isPrimary = appearance === 'primary';

    return classnames(
      className,
      padding('p-2'),
      borderRadius('rounded'),
      textColor({ 'text-zinc-200': isPrimary }),
      transitionProperty('transition'),
      backgroundColor({
        'bg-indigo-700': isPrimary,
        'hover:bg-indigo-800': isPrimary,
      })
    );
  },
};

export default function Button({
  appearance = 'primary',
  className,
  ...rest
}: Props): ReactElement<Props> {
  return <button className={styles.root(className, appearance)} {...rest} />;
}
