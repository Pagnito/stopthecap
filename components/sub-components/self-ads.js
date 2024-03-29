import React from "react";
import Image from "next/image";

export default function SelfAds(props) {
  return (
    <div className="flex z-20 sm:p-10 h-full w-full animate-down opacity-0 -translate-y-5">
      <div className="cursor-pointer xxs:w-full w-1/2 h-full relative m-5 rounded overflow-hidden flex justify-center items-center flex-col">
        <div className="relative z-50 text-red-500 text-3xl">Be Whole Now</div>
        <div className="relative z-50 font-serif text-white text-6xl xxs:ml-5 sm:ml-0">Wear your mottos</div>
        <Image layout="fill" objectFit="cover" src="/images/self-ad-image-one.jpg"></Image>
      </div>
      <div className="cursor-pointer xxs:hidden w-1/2 h-full relative m-5 rounded overflow-hidden flex justify-center items-center flex-col">
        <div className="relative z-50 text-red-500 text-3xl">New Eyez Collection</div>
        <div className="relative z-50 font-serif text-white text-6xl">Awesome Deals!</div>
        <Image layout="fill" objectFit="cover" src="/images/self-ad-image-two.jpg"></Image>
      </div>
    </div>
  );
}
