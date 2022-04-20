import React from "react";
import Link from "next/link";

export default function VideoSlide(props) {
  let data = props.data;
  let video_url = props.url;
  return (
    <div className="w-full h-screen">
      <div className="w-full h-screen flex items-center justify-center sm:pr-10 sm:pl-10">
        <div className="p-5 mt-10 text-white font-sans flex flex-col justify-center items-center">
          <div className="text-red-500 xxs:text-xl sm:text-2xl">{data.text_one}</div>
          <div className="font-serif xxs:text-3xl sm:text-5xl mt-4">{data.text_two}</div>
          <div className="font-serif xxs:text-3xl sm:text-5xl">{data.text_three}</div>
          <div className="h-2 bg-red-500 w-24 mt-4"></div>
          <div className="mt-6">{data.text_four}</div>
          <Link href="/shop" passHref>
            <button className="hover:bg-red-500 transition-colors cursor-pointer mt-12 pl-10 pr-10 pt-4 pb-4 text-lg border-solid border-red-500 border-2 rounded">
              SHOP NOW
            </button>
          </Link>
        </div>
      </div>
      <video autoPlay={true} muted={true} loop={true} className="absolute top-0 h-screen w-full object-cover -z-10">
        <source src={video_url} type="video/mp4" />
      </video>
    </div>
  );
}
