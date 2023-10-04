import * as React from "react";
import { Image } from "@yext/sites-components";

export interface BannerProps {
  name?: string;
  paragraph?: string;
  photoGallery?: any;
}

const Banner = ({ name, paragraph, photoGallery }: BannerProps) => {

  return (
    <>

      {photoGallery ?
        // If a photo is present, use it as background overlay
        <div className="relative bg-gray-800 h-96">
          <Image image={photoGallery[0]} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-normal text-white sm:text-6xl">{name}</h1>
            <p className="mt-6 text-lg leading-8 text-gray-100 tracking-wide">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
        :
        // Otherwise, use a colored background overlay
        <div className="bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">{name}</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      }
    </>
  );
};

export default Banner;
