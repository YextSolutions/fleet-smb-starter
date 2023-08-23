import * as React from "react";
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { formatPhoneNumber } from "react-phone-number-input";
import { Image } from "@yext/sites-components";
import { Link } from "@yext/sites-components";

export interface HeaderProps {
  data?: any;
}

const navigation = [
  { name: "About", href: "#about" },
  { name: "Hours", href: "#hours" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" },
];

const Header = ({ data }: HeaderProps) => {

  let phone = data.mainPhone ? data.mainPhone : "+12345678910";
  let email = data.emails?.[0] ?? "test@test.com";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="" style={{background: `var(--backgroundColor)`}}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex items-center gap-x-12">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            { data.logo ? (
              <Image image={data.logo.image} layout="fixed" height={80} width={80} />
              ) : (
                <img className="h-24 w-auto rounded-md" src="https://logoipsum.com/logoipsum.png" alt="" />
            )}
          </a>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link 
                href={item.href}  
                key={item.name}
                className="tracking-tight font-bold leading-6 text-gray-900 hover:text-gray-700"
                eventName={`cta Click_${item.name}`}
                >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex justify-around space-x-8">
          <Link
            href={`tel:${phone}`}
            className="tracking-tight font-bold leading-6 text-gray-900 hover:text-gray-700"
            eventName={`phoneCall`}
          >
            {formatPhoneNumber(phone)}
          </Link>
          <Link
            href={`mailto: ${email}`}
            className="tracking-tight font-bold leading-6 text-gray-900 hover:text-gray-700"
            eventName={`email`}
          >
            {email}
          </Link>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10" style={{background: `var(--backgroundColor)`}}>
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              { data.logo ? (
                <Image image={data.logo.image} layout="fixed" height={80} width={80} />
                ) : (
                  <img className="h-24 w-auto rounded-md" src="https://logoipsum.com/logoipsum.png" alt="" />
              )}
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link 
                    href={item.href}
                    key={item.name}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    eventName={`cta Click_${item.name}`}
                    >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6 space-y-4 flex flex-col">
                <Link
                  href={`tel:${phone}`}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  eventName={`phoneCall`}
                >
                  {formatPhoneNumber(phone)}
                </Link>                
                <Link
                  href={`mailto: ${email}`}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  eventName={`email`}
                >
                  {email}
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )  

};

export default Header;
