import React from "react";
import { RiCheckFill } from "react-icons/ri";
import { Image } from "next/image";
export default function FeaturedProduct(props) {
  props = {
    text_one: "Awesome Time",
    text_two: "Whenever",
    text_three: "Grab It Out Of Your Pocket!",
    feature_one: "Awesome Battery Life",
    feature_two: "Compact",
    featuure_three: "Bluetooth Connectivity",
  };
  return (
    <div className="xs:flex-col-reverse lg:flex-row flex xs:items-center xs:p-5 md:p-20 z-20 relative w-full -mt-3 clip-path-one bg-white">
      <div className="flex text-left flex-col items-center xs:w-full md:w-1/2 md:ml-10">
        <div className="flex flex-col justify-start">
          <div className="xs:text-3xl lg:text-4xl">{props.text_one}</div>
          <div className="xs:text-6xl lg:text-8xl text-red-500">
            {props.text_two}
          </div>
          <div className="xs:text-xl lg:text-2xl">{props.text_three}</div>
          <ul className="pl-5">
            <li className="mt-5 flex">
              <RiCheckFill color="EF4444" size="20px" className="mr-1 mt-0.5" />
              {props.feature_one}
            </li>
            <li className="mt-5 flex">
              <RiCheckFill color="EF4444" size="20px" className="mr-1 mt-0.5" />
              {props.feature_two}
            </li>
            <li className="mt-5 flex">
              <RiCheckFill color="EF4444" size="20px" className="mr-1 mt-0.5" />
              {props.featuure_three}
            </li>
          </ul>
          <div className="hover:bg-red-500 transition-colors cursor-pointer mt-7 pt-4 pb-4 pl-8 pr-8 text-theme-blue self-start text-lg border-solid border-red-500 border-2 rounded">
            Buy Bow
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center xs:mt-20 md:mt-0 md:w-1/2">
        <img src="/images/backpack.jpg" className="" />
      </div>
    </div>
  );
}
