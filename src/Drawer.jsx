import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

function Drawer({ open, onClose, title, children }) {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500/75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-0 flex justify-end sm:pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out sm:delay-75 duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-full max-w-5xl">
                  <div className="relative flex h-full flex-col overflow-y-scroll bg-white p-6 shadow-xl sm:px-8">
                    <div className="absolute right-0 top-0 pt-4 pr-4">
                      <button
                        type="button"
                        className="flex h-11 w-11 items-center justify-center rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-700"
                        onClick={onClose}
                      >
                        <span className="sr-only">Close panel</span>
                        <FontAwesomeIcon icon={faClose} size="lg" aria-hidden="true" />
                      </button>
                    </div>
                    <Dialog.Title className="text-lg font-bold text-gray-900">{title}</Dialog.Title>
                    <div className="relative mt-6 flex-1">{children}</div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Drawer
