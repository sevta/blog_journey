import { Transition } from "@headlessui/react";

export default function Fade({ show, children }) {
  return (
    <Transition
      as="Fragment"
      appear={true}
      show={show}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition>
  );
}
