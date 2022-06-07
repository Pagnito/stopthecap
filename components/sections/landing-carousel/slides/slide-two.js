import React from "react";
import Link from "next/link";

export default function SlideTwo({ data }) {
  return (
    <div className="w-full bg-landing-slider-two bg-center bg-cover h-screen flex items-center justify-center pr-10 pl-10">
      <div className="p-5 mt-10 text-white font-sans flex flex-col justify-center items-center">
        <div className="text-2xl">{data.text_one}</div>
        <div className="font-serif text-5xl mt-4">{data.text_two}</div>
        <div className="font-serif text-5xl">{data.text_three}</div>
        <div className="h-2 bg-red-500 w-24 mt-4"></div>
        <div className="mt-6">{data.text_four}</div>
        <Link href="/shop" passHref>
          <button className="hover:bg-red-500 transition-colors cursor-pointer mt-12 pl-10 pr-10 pt-4 pb-4 text-lg border-solid border-red-500 border-2 rounded">
            SHOP NOW
          </button>
        </Link>
      </div>
    </div>
  );
}
