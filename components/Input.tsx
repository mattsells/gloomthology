import { ReactElement } from 'react';
import {
  backgroundColor,
  borderColor,
  borderRadius,
  borderStyle,
  borderWidth,
  boxShadow,
  classnames,
  display,
  flexDirection,
  fontSize,
  margin,
  padding,
  textColor,
} from 'tailwindcss-classnames';

type Props = React.HTMLProps<HTMLInputElement> & {
  error?: string;
  isTouched?: boolean;
  label?: string;
};

const styles = {
  root: (className: any) =>
    classnames(className, display('flex'), flexDirection('flex-col')),

  label: classnames(
    fontSize('text-base'),
    margin('mb-1'),
    textColor('text-slate-50')
  ),

  input: (isError: boolean) =>
    classnames(
      backgroundColor('bg-zinc-300'),
      boxShadow('focus:shadow'),
      borderColor({ 'border-rose-500': isError }),
      borderRadius('rounded'),
      borderStyle({ 'border-solid': isError }),
      borderWidth({ 'border-2': isError }),
      padding('p-2'),
      textColor('text-slate-600')
    ),

  error: classnames(margin('mt-1'), textColor('text-rose-500')),
};

export default function Input({
  className,
  error,
  isTouched,
  label,
  ...rest
}: Props): ReactElement<Props> {
  const isInvalid = !!(error && isTouched);

  return (
    <div className={styles.root(className)}>
      {label && <label className={styles.label}>{label}</label>}
      <input className={styles.input(isInvalid)} {...rest} />
      {isInvalid && <p className={styles.error}>{error}</p>}
    </div>
  );
}
