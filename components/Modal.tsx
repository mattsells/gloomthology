import { ReactElement, ReactNode } from 'react';
import { GiAxeSword } from 'react-icons/gi';

import Panel from './Panel';
import Portal from './Portal';

// TODO: Add title prop
type Props = {
  children: ReactNode;
  onDismiss?: VoidFunction;
};

export default function Modal({ children, onDismiss }: Props): ReactElement {
  return (
    <Portal>
      <div className="fixed inset-0 bg-black/50">
        <div className="flex justify-center items-center py-16 h-full">
          <Panel size="medium">
            <div className="flex justify-end">
              <Button onClick={onDismiss} />
            </div>
            {children}
          </Panel>
        </div>
      </div>
    </Portal>
  );
}

type ButtonProps = {
  onClick?: VoidFunction;
};

function Button(props: ButtonProps): ReactElement<ButtonProps> {
  return (
    <button
      className="text-slate-50 text-2xl rounded-full p-2 bg-zinc-700 hover:bg-zinc-500"
      {...props}
    >
      <GiAxeSword />
    </button>
  );
}

type BodyProps = {
  children: ReactNode;
};

function Body(props: BodyProps): ReactElement {
  return <div {...props} />;
}

type FooterProps = {
  children: ReactNode;
};

function Footer(props: FooterProps): ReactElement {
  return <div className="py-4" {...props} />;
}

Modal.Body = Body;
Modal.Footer = Footer;
