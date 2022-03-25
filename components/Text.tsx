import { ReactElement, createElement } from 'react';
import classnames, { fontSize, textColor } from 'tailwindcss-classnames';

const styles = {
  body: (className: any) =>
    classnames(fontSize('text-xl'), textColor('text-zinc-200'), className),

  label: (className: any) =>
    classnames(fontSize('text-sm'), textColor('text-zinc-400'), className),

  subheader: (className: any) =>
    classnames(fontSize('text-2xl'), textColor('text-zinc-400'), className),

  header: (className: any) =>
    classnames(fontSize('text-3xl'), textColor('text-indigo-500'), className),
};

type Appearance = 'header' | 'body' | 'subheader' | 'label';
type As = 'h1' | 'h2' | 'span' | 'label' | 'p';

type Props = React.HTMLProps<HTMLSpanElement> & {
  appearance?: Appearance;
  as?: As;
};

export default function Text({
  appearance = 'header',
  as = 'span',
  children,
  className,
  ...rest
}: Props): ReactElement<Props> {
  return createElement(
    as,
    { className: styles[appearance](className), ...rest },
    children
  );
}
