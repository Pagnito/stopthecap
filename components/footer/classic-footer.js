import React from "react";
import { RiFacebookBoxFill, RiInstagramFill, RiYoutubeFill } from "react-icons/ri";
import { FaTiktok } from "react-icons/fa";
import Link from "next/link";
export default function Footer(props) {
  return (
    <div className="bg-theme-blue lg:pt-20 lg:pl-20 lg:pr-20">
      <div className="flex lg:flex-row xxs:flex-col-reverse xxs:items-center lg:items-start justify-between">
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
        <div className="flex h-32 flex-col justify-between xxs:mt-5 lg:mt-0">
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
              <FaTiktok className="mr-5 cursor-pointer" color="white" size="25px" />
            </div>
          </div>
          <div className="text-white xxs:mb-10 lg:mb-0">info@stopthecap.com</div>
        </div>
      </div>

      <div className="text-white w-full text-center p-5 mt-10 text-xs">© 2022 StopTheCap</div>
    </div>
  );
}
