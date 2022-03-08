import { ReactElement, createElement } from 'react';
import classnames, { fontSize, textColor } from 'tailwindcss-classnames';

const styles = {
  header: (className: any) =>
    classnames(className, fontSize('text-3xl'), textColor('text-indigo-500')),
};

type Appearance = 'header';
type As = 'h1' | 'h2' | 'span';

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
