import React, { createRef, useEffect, useState } from "react";
import Link from "next/link";
import { RiCloseFill } from "react-icons/ri";
import { RiFacebookBoxFill, RiInstagramFill, RiYoutubeFill } from "react-icons/ri";
import { FaTiktok } from "react-icons/fa";
export default function MobileNav(props) {
  useEffect(() => {}, []);
  return (
    <div className="fixed shadow-xl z-40 top-0 flex flex-col justify-center -translate-x-full animate-doors-close bg-white items-center h-screen w-full">
      <img src="/images/StopTheCapLogo-Black.png" className="fixed opacity-100 w-1/3 top-20"></img>

      <div onClick={props.closeMobileNav} className="cursor-pointer z-50 scale-0 animate-close-x absolute top-5 right-5">
        <RiCloseFill size="35px" color="black" />
      </div>
      <div className="w-3/4 z-50 flex text-xl flex-col justify-center">
        <Link href="/" passHref>
          <div onClick={props.closeMobileNav}>Home</div>
        </Link>
        <Link href="/contact" passHref>
          <div onClick={props.closeMobileNav} className="mt-4">
            Contact
          </div>
        </Link>
        <Link href="/about" passHref>
          <div onClick={props.closeMobileNav} className="mt-4">
            About
          </div>
        </Link>
        <Link href="/shop" passHref>
          <div onClick={props.closeMobileNav} className="mt-4">
            Shop
          </div>
        </Link>
      </div>
      <div className="flex h-32 flex-col justify-between xxs:mt-5 lg:mt-0 fixed bottom-0 right-0">
        <div className="flex">
          <div>
            <RiFacebookBoxFill className="mr-5 cursor-pointer" color="#38539B" size="30px" />
          </div>
          <div>
            <RiInstagramFill className="mr-5 cursor-pointer" color="#DF3869" size="30px" />
          </div>
          <div>
            <RiYoutubeFill className="mr-5 cursor-pointer" color="#EF4444" size="33px" />
          </div>
          <div>
            <FaTiktok className="mr-5 cursor-pointer" color="black" size="25px" />
          </div>
        </div>
        <div className="text-black xxs:mb-10 lg:mb-0">info@stopthecap.com</div>
      </div>
    </div>
  );
}
