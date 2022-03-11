import { ReactNode, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { randomString } from '@/utils/string';

type Props = {
  children: ReactNode;
};

const PORTAL_ID = 'portal';

export default function Portal({ children }: Props) {
  const [el, setEl] = useState<Nullable<HTMLDivElement>>(null);

  useLayoutEffect((): any => {
    const el = createTarget();

    setEl(el);

    return () => el.parentNode?.removeChild(el);
  }, []);

  return el ? createPortal(children, el) : null;
}

function createTarget(): HTMLDivElement {
  const el = document.createElement('div');
  el.setAttribute('id', `${PORTAL_ID}-${randomString()}`);
  document.body.appendChild(el);
  return el;
}
