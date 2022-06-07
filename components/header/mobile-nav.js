import React, { useEffect } from "react";
import Link from "next/link";
import { RiInstagramFill, RiYoutubeFill, RiArrowDropRightLine, RiCloseFill } from "react-icons/ri";
import { FaTiktok } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";

export default function MobileNav(props) {
  useEffect(() => { }, []);
  return (
    <div className="fixed shadow-xl z-50 top-0 flex flex-col -translate-x-full animate-doors-close bg-white items-center h-screen w-full">
      <img src="/images/StopTheCapLogo-Black.png" className="fixed opacity-100 w-16 top-4"></img>

      <div onClick={props.closeMobileNav} className="cursor-pointer z-50 scale-0 animate-close-x absolute top-5 right-5">
        <RiCloseFill size="35px" color="black" />
      </div>
      <div className="ml-3 mt-28 w-5/6 flex text-xl flex-col justify-center">
        <Link href="/" passHref>
          <div className="w-full flex justify-between items-center">
            <div onClick={props.closeMobileNav}>Home</div>
            <RiArrowDropRightLine  size="40px" />
          </div>
        </Link>
        <Link href="/contact" passHref>
          <div className="w-full flex justify-between items-center">

            <div onClick={props.closeMobileNav} className="mt-4">
              Contact
            </div>
            <RiArrowDropRightLine size="40px" />
          </div>
        </Link>
        <Link href="/about" passHref>
          <div className="w-full flex justify-between items-center">

            <div onClick={props.closeMobileNav} className="mt-4">
              About
            </div>
            <RiArrowDropRightLine size="40px" />
          </div>
        </Link>
        <Link href="/shop" passHref>
          <div className="w-full flex justify-between items-center">

            <div onClick={props.closeMobileNav} className="mt-4">
              Shop
            </div>
            <RiArrowDropRightLine size="40px" />
          </div>
        </Link>
      </div>
      <div className="flex h-32 flex-col justify-between fixed bottom-32 xxs:mt-5 lg:mt-0">
        <div className="p-10 flex justify-center items-center">
          <div className="hover:scale-110 transition-transform cursor-pointer w-10 h-10 p-2 flex items-center justify-center rounded-full border-2 border-black xxs:mx-3 sm:mx-5 lg:mx-10">
            <FaFacebookF color="black" size="23px" />
          </div>
          <div className="hover:scale-110 transition-transform cursor-pointer w-10 h-10 p-2 flex items-center justify-center rounded-full border-2 border-black xxs:mx-3 sm:mx-5 lg:mx-10">
            <RiInstagramFill color="black" size="25px" />
          </div>
          <div className="hover:scale-110 transition-transform cursor-pointer w-10 h-10 p-2 flex items-center justify-center rounded-full border-2 border-black xxs:mx-3 sm:mx-5 lg:mx-10">
            <RiYoutubeFill color="black" size="28px" />
          </div>
          <div className="hover:scale-110 transition-transform cursor-pointer w-10 h-10 p-2 flex items-center justify-center rounded-full border-2 border-black xxs:mx-3 sm:mx-5 lg:mx-10">
            <FaTiktok color="black" size="20px" />
          </div>
        </div>
        <div className="text-black xxs:mb-10 lg:mb-0 text-center">info@stopthecap.com</div>
      </div>
    </div>
  );
}
