import { ReactElement } from 'react';
import {
  backgroundColor,
  borderRadius,
  classnames,
  opacity,
  padding,
  textColor,
  transitionProperty,
} from 'tailwindcss-classnames';

type Appearance = 'primary' | 'secondary' | 'destructive';
type Type = 'button' | 'submit' | 'reset' | undefined;

type Props = React.HTMLProps<HTMLButtonElement> & {
  appearance?: Appearance;
  type?: Type;
};

const styles = {
  root: (
    className: any,
    appearance: Appearance,
    isDisabled: boolean | undefined
  ) => {
    const isPrimary = appearance === 'primary';
    const isSecondary = appearance === 'secondary';
    const isDestructive = appearance === 'destructive';

    return classnames(
      className,
      padding('p-2'),
      borderRadius('rounded'),
      textColor({
        'text-zinc-200': isPrimary || isDestructive,
        'text-zinc-600': isSecondary,
      }),
      transitionProperty('transition'),
      backgroundColor({
        'bg-indigo-700': isPrimary,
        'hover:bg-indigo-800': isPrimary && !isDisabled,
        'bg-indigo-50': isSecondary,
        'hover:bg-indigo-100': isSecondary && !isDisabled,
        'bg-rose-600': isDestructive,
        'hover:bg-rose-700': isDestructive && !isDisabled,
      }),
      opacity({ 'opacity-60': isDisabled })
    );
  },
};

export default function Button({
  appearance = 'primary',
  className,
  disabled,
  ...rest
}: Props): ReactElement<Props> {
  return (
    <button
      className={styles.root(className, appearance, disabled)}
      disabled={disabled}
      {...rest}
    />
  );
}
