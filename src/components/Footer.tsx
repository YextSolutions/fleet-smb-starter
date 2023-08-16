import * as React from "react";
import {
  Facebook,
  GitHub,
  Instagram,
  Twitter,
  YouTube,
} from "../assets/svgs/SocialIcons";
import { Link } from "@yext/sites-components";

export interface FooterProps {
  _site?: any;
  logo?: string;
  paragraph?: string;
}

const currentTime = new Date();
const year = currentTime.getFullYear();

const navigation = {
  company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Jobs", href: "#" },
    { name: "Press", href: "#" },
  ],
  legal: [
    { name: "Claim", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: (
        props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
      ) => <Facebook {...props} />,
    },
    {
      name: "Instagram",
      href: "#",
      icon: (
        props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
      ) => <Instagram {...props} />,
    },
    {
      name: "Twitter",
      href: "#",
      icon: (
        props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
      ) => <Twitter {...props} />,
    },
    {
      name: "GitHub",
      href: "#",
      icon: (
        props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
      ) => <GitHub {...props} />,
    },
    {
      name: "YouTube",
      href: "#",
      icon: (
        props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
      ) => <YouTube {...props} />,
    },
  ],
};

const Footer = ( { paragraph }: FooterProps) => {

  return (
      <footer className="" style={{background: `var(--backgroundColor)`}}>
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          {navigation.company.map((item) => (
            <div key={item.name}>
              <Link 
                href={item.href}
                className="pb-6 text-sm leading-6 text-gray-600 hover:text-gray-900"
                eventName={`cta Click_${item.name}`}
                >
                  {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <div className="mt-10 flex justify-center space-x-10">
          {navigation.social.map((item) => (
              <Link 
                href={item.href}
                key={item.name}
                className="text-gray-400 hover:text-gray-500"
                eventName={`cta Click_${item.name}`}
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
              </Link>
          ))}
        </div>
        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy; 2023 Your Company, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
