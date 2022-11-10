import React from "react";
import Image from "next/image";
import Link from "next/link";
import useProduct from "../../../use/useProduct";
export default function ModelDisplay({ product }) {

  return (
    <>
      <div style={{ height: '120vh' }} className="relative bg-white flex justify-end items-center xxs:flex-col-reverse md:flex-row">
        <div className="md:-mt-20 p-5 flex flex-col relative">
        <div className="font-rajdhani xxs:text-xl md:text-3xl text-red-500">Look In The Mirror</div>
          <div className="font-serif xxs:text-6xl md:text-8xl">See Yourself.</div>
          <Link href={`/shop`} passHref>
            <div className="hover:border-theme-blue transition-colors cursor-pointer mt-3 pt-4 pb-4 pl-8 pr-8 text-theme-blue text-lg border-solid border-red-500 border-t-8">
              Shop Now
            </div>
          </Link>
        </div>
        <div className="h-3/4 md:w-1/2 xxs:w-full relative">
          <Image layout="fill" objectFit="contain" src="/images/fashion-eight.jpg" />
        </div>

      </div>
      <div className="xxs:hidden md:flex md:px-20 flex flex-col w-full items-center justify-center bg-white">
        <div className="font-serif text-6xl px-4">Stop The Cap
          <div className="border-t-8 border-red-500 -mt-6 w-full"></div>
        </div>
      </div>

      <div style={{ height: '120vh' }} className="relative bg-white flex justify-start items-center xxs:flex-col md:flex-row">
        <div className="h-3/4 md:w-1/2 xxs:w-full relative">
          <Image layout="fill" objectFit="contain" src="/images/fashion-nine.jpg" />
        </div>
        <div className="md:-mt-20 p-5 flex flex-col relative">
          <div className="font-rajdhani xxs:text-xl md:text-3xl text-red-500">Starts With Looks</div>
          <div className="font-serif xxs:text-6xl md:text-8xl">Ends With Result.</div>
          <Link href={`/shop`} passHref>
            <div className="hover:border-theme-blue transition-colors cursor-pointer mt-3 pt-4 pb-4 pl-8 pr-8 text-theme-blue text-lg border-solid border-red-500 border-t-8">
              Shop Now
            </div>
          </Link>
        </div>
      </div>
    </>

  );
}
