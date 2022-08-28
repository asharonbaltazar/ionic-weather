import React, { ReactNode } from 'react';
import { Dialog } from '@headlessui/react';

interface ModalProps {
  title: string;
  description?: string;
  children: ReactNode;
  open: boolean;
  onClose: (newModalState: boolean) => void;
}

export const Modal = ({
  title,
  description,
  children,
  open,
  onClose,
}: ModalProps) => (
  <Dialog className="relative z-50" open={open} onClose={() => onClose(false)}>
    <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
    <div className="fixed inset-0 flex items-center justify-center">
      <Dialog.Panel className="p-4 rounded-lg w-9/12 sm:w-7/12 md:w-5/12 bg-slate-100 dark:bg-zinc-800">
        <Dialog.Title className="md:text-sm font-medium text-gray-900/50 dark:text-stone-200/70">
          {title}
        </Dialog.Title>
        {description && <Dialog.Description>{description}</Dialog.Description>}
        <div className="mt-3">{children}</div>
      </Dialog.Panel>
    </div>
  </Dialog>
);
