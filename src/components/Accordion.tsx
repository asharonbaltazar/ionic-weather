import React, { Fragment, ReactNode } from 'react';
import { Disclosure } from '@headlessui/react';
import { Icon } from '@iconify/react';

interface AccordionProps {
  buttonChildren: ReactNode;
  children: ReactNode;
}

export const Accordion = ({ buttonChildren, children }: AccordionProps) => (
  <Disclosure as="div" className="rounded-md border border-gray-200">
    <Disclosure.Button className="w-full">
      {({ open }) => (
        <Fragment>
          <div className="flex justify-between items-center">
            <div>{buttonChildren}</div>
            <Icon
              className="text-2xl mr-5"
              icon={open ? 'tabler:chevron-up' : 'tabler:chevron-down'}
            />
          </div>

          <Disclosure.Panel as={Fragment}>{children}</Disclosure.Panel>
        </Fragment>
      )}
    </Disclosure.Button>
  </Disclosure>
);
