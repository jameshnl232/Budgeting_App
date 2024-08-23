import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, Form } from "react-router-dom";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import { TrashIcon } from "@heroicons/react/24/solid";

const navigation = [
  { name: "Home", href: "/home" },
  { name: "Budget", href: "/budgets" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user } = useContext(GlobalContext);

  const navigate = useNavigate();

  const handleRedirect = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <header className="top-0 bg-opacity-10">
        <nav
          aria-label="Global"
          className="flex justify-start items-center p-6 lg:px-8 text-gray-1000"
        >
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          <div className="hidden lg:flex items-center lg:gap-x-12">
            <button
              onClick={() => {
                handleRedirect("/home");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>

            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `text-3xl font-semibold leading-6 hover:text-blue-800 hover:underline ${
                    isActive ? "text-blue-600" : ""
                  }`
                }
                end
              >
                {item.name}
              </NavLink>
            ))}
          </div>
          {user && (
            <div className="lg:ml-auto lg:block hidden">
              <Form
                method="post"
                action="/logout"
                onSubmit={(event) => {
                  if (!confirm("Delete user and all data")) {
                    event.preventDefault();
                  }
                }}
              >
                <button
                  type="submit"
                  className="hover:ring-2 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  <div className="flex gap-x-2">
                    <span>Log out</span>
                    <TrashIcon width={20} />
                  </div>
                </button>
              </Form>
            </div>
          )}
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
                {user && (
                  <Form
                    method="post"
                    action="/logout"
                    onSubmit={(event) => {
                      if (!confirm("Delete user and all data")) {
                        event.preventDefault();
                      }
                    }}
                    className="flex-col h-screen justify-center items-center content-end pb-5"
                  >
                    <button
                      type="submit"
                      className="hover:ring-2 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      <div className="flex gap-x-2">
                        <span>Log out</span>
                        <TrashIcon width={20} />
                      </div>
                    </button>
                  </Form>
                )}
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </>
  );
}
