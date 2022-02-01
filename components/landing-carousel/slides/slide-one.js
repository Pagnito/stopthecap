import React from "react";

export default function SlideOne({data}) {
  
  return (
    <div className={`top-0 w-full bg-landing-slider-one bg-center bg-cover h-screen flex items-center justify-end pr-10 pl-10`}>
      <div className="p-5 mt-10 text-left text-white font-sans mr-20 flex flex-col justify-start items-start">
        <div className="animate-text-one opacity-0 -translate-x-8 text-2xl">{data.text_one}</div>
        <div className="animate-text-two opacity-0 -translate-x-8 font-serif text-5xl mt-4">{data.text_two}</div>
        <div className="animate-text-three opacity-0 -translate-x-8  font-serif text-5xl">{data.text_three}</div>
        <div className="animate-text-three opacity-0 -translate-x-8  h-2 bg-red-500 w-24 mt-4"></div>
        <div className="animate-text-four opacity-0 -translate-x-8 mt-6">{data.text_four}</div>
        <div className="animate-button opacity-0 -translate-x-8 hover:bg-red-500 transition-colors cursor-pointer mt-12 pl-10 pr-10 pt-4 pb-4 text-lg border-solid border-red-500 border-2 self-start rounded">SHOP NOW</div>
      </div>
    </div>
  );
}
