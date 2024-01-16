import * as React from "react";
import { formatPhoneNumber } from "react-phone-number-input";
import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

export interface ContactSectionProps {
  address?: any;
  phone?: string;
  email?: string;
}

const ContactSection = ({ address, phone, email }: ContactSectionProps) => {
  return (
    <>
      <div className="relative px-6 py-20 lg:px-8">
        <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-50 ring-1 ring-gray-900/10">
          <svg
            className="absolute inset-0 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                width={200}
                height={200}
                x="100%"
                y={-1}
                patternUnits="userSpaceOnUse"
              >
                <path d="M130 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth={0} fill="white" />
            <svg x="100%" y={-1} className="overflow-visible fill-gray-50">
              <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
            </svg>
            <rect
              width="100%"
              height="100%"
              strokeWidth={0}
              fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
            />
          </svg>
        </div>

        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            <a id="contact">Contact</a>
          </h2>
          <table className="flex items-center justify-center text-gray-600">
            <tbody className="">
              {address && (
                <tr className="h-14">
                  <td className="pr-10">
                    <span className="sr-only">Address</span>
                    <BuildingOffice2Icon
                      className="h-7 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                  </td>
                  <td className="">
                    <div>
                      {address.line1}
                      <br />
                      {address.city}, {address.region} {address.postalCode}
                    </div>
                  </td>
                </tr>
              )}
              {phone && (
                <tr className="h-14">
                  <td>
                    <span className="sr-only">Phone</span>
                    <PhoneIcon
                      className="h-7 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                  </td>
                  <td>
                    <a className="hover:text-gray-900" href={`tel:${phone}`}>
                      {formatPhoneNumber(phone)}
                    </a>
                  </td>
                </tr>
              )}
              {email && (
                <tr className="h-14">
                  <td>
                    <span className="sr-only">Email</span>
                    <EnvelopeIcon
                      className="h-7 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                  </td>
                  <td>
                    <a
                      className="hover:text-gray-900"
                      href="mailto:hello@example.com"
                    >
                      {email[0]}
                    </a>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* <div className="flex justify-center items-center gap-x-10 text-gray-600">
              <span className="sr-only">Address</span>
              <BuildingOffice2Icon className="h-7 w-6 text-gray-400" aria-hidden="true" />
              <dd>
                {address.line1}
                <br />
                {address.city}, {address.region} {address.postalCode}
              </dd>
          </div>
          <div className="flex justify-center items-center gap-x-10 text-gray-600">
                <span className="sr-only">Telephone</span>
                <PhoneIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
                <a className="hover:text-gray-900" href={`tel:${phone}`}>
                  {formatPhoneNumber(phone)}
                </a>
          </div>
          <div className="flex justify-center items-center gap-x-10 text-gray-600">
              <span className="sr-only">Email</span>
              <EnvelopeIcon className="h-7 w-6 text-gray-400" aria-hidden="true" />
              <a className="hover:text-gray-900" href="mailto:hello@example.com">
                  {email[0]}
                </a>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ContactSection;
