import { useState } from 'react';

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);
  const handleToggle = () => setIsOpen(!isOpen);

  return {
    close: handleClose,
    isOpen,
    open: handleOpen,
    toggle: handleToggle,
  };
}
