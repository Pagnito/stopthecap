import React from "react";
import { RiInstagramFill, RiYoutubeFill } from "react-icons/ri";
import { FaTiktok } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import Link from "next/link";

export default function Footer(props) {
  return (
    <div className="bg-theme-blue lg:pt-20 lg:pl-20 lg:pr-20">
      <div className="flex lg:flex-row xxs:flex-col-reverse xxs:items-center lg:items-start justify-between pt-5">
        <div className="text-white flex lg:flex-row xxs:flex-col">
          <div>
            <h1 className="text-2xl text-red-500">Info</h1>
            <ul>
              <li className="hover:text-red-500 cursor-pointer transition-colors">
                <Link href="/terms-of-service" passHref>
                  Terms And Conditions
                </Link>
              </li>
              <li className="hover:text-red-500 cursor-pointer transition-colors">
                <Link href="/privacy-policy" passHref>
                  Privacy Policy
                </Link>
              </li>
              <li className="hover:text-red-500 cursor-pointer transition-colors">
                <Link href="/shipping-policy" passHref>
                  Shipping And Delivery
                </Link>
              </li>
              <li className="hover:text-red-500 cursor-pointer transition-colors">
                <Link href="/returns-policy" passHref>
                  Returns
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:ml-16 xxs:mt-10 lg:mt-0">
            <h1 className="text-2xl text-red-500">Menu</h1>
            <ul>
              <li className="hover:text-red-500 cursor-pointer transition-colors">
                <Link href="/" passHref>
                  Home
                </Link>
              </li>
              <li className="hover:text-red-500 cursor-pointer transition-colors">
                <Link href="/about" passHref>
                  About
                </Link>
              </li>
              <li className="hover:text-red-500 cursor-pointer transition-colors">
                <Link href="/contact" passHref>
                  Contact
                </Link>
              </li>
              <li className="hover:text-red-500 cursor-pointer transition-colors">
                <Link href="/shop" passHref>
                  Shop
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:ml-16 xxs:mt-10 lg:mt-0">
            <h1 className="text-2xl text-red-500">Additional Links</h1>
            <ul>
              <li className="hover:text-red-500 cursor-pointer transition-colors">Track Your Order</li>
              <li className="hover:text-red-500 cursor-pointer transition-colors">Wishlist</li>
              <li className="hover:text-red-500 cursor-pointer transition-colors">FAQs</li>
            </ul>
          </div>
        </div>
        <div className="flex h-32 flex-col justify-between xxs:w-4/6 md:w-60">
          <div className="flex w-full justify-between">
            <div className="hover:scale-110 transition-transform cursor-pointer w-10 h-10 p-2 flex items-center justify-center rounded-full border-2 border-white">
              <FaFacebookF color="white" size="23px" />
            </div>
            <div className="hover:scale-110 transition-transform cursor-pointer w-10 h-10 p-2 flex items-center justify-center rounded-full border-2 border-white">
              <RiInstagramFill color="white" size="25px" />
            </div>
            <div className="hover:scale-110 transition-transform cursor-pointer w-10 h-10 p-2 flex items-center justify-center rounded-full border-2 border-white">
              <RiYoutubeFill color="white" size="28px" />
            </div>
            <div className="hover:scale-110 transition-transform cursor-pointer w-10 h-10 p-2 flex items-center justify-center rounded-full border-2 border-white">
              <FaTiktok color="white" size="20px" />
            </div>
          </div>
          <div className="text-white xxs:mb-10 lg:mb-0 xxs:text-center md:text-left xxs:mt-10 md:mt-0">info@stopthecap.com</div>
        </div>
      </div>

      <div className="text-white w-full text-center p-5 mt-10 text-xs">© 2022 StopTheCap</div>
    </div>
  );
}
