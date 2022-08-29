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
      <Dialog.Panel className="w-9/12 rounded-lg bg-slate-100 p-4 dark:bg-zinc-800 sm:w-7/12 md:w-5/12">
        <Dialog.Title className="font-medium text-gray-900/50 dark:text-stone-200/70 md:text-sm">
          {title}
        </Dialog.Title>
        {description && <Dialog.Description>{description}</Dialog.Description>}
        <div className="mt-3">{children}</div>
      </Dialog.Panel>
    </div>
  </Dialog>
);
