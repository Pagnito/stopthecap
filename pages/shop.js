import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Shop(props) {
  return (
    <div className="min-h-screen pt-20">
      <div className="flex flex-col items-center bg-shop-banner py-40 bg-center">
        <div className="flex w-2/3 justify-center items-center -mt-1">
          <div className="mr-5 h-2px bg-white w-1/3 rounded-full"></div>
          <Link href="/" passHref>
            <div>
              <Image
                alt="Brand Logo"
                width={200}
                height={200}
                className="m-1 cursor-pointer"
                src="/images/StopTheCap-Favicon-White.png"
                objectFit="contain"
              />
            </div>
          </Link>

          <div className="ml-5 h-2px bg-white w-1/3 rounded-full"></div>
        </div>
        <div className="catalog-container">
          <div className="filters"></div>
          <div className="grid"></div>
        </div>
      </div>
    </div>
  );
}
