import React from "react";
import Link from "next/link";
import Image from "next/image";

import ShopFilters from "../components/sub-components/shop-filters";

export default function Shop(props) {
  return (
    <div className="min-h-screen pt-20">
      <div className="flex w-full justify-center items-center -mt-1">
        {/* <div className="mr-5 h-2px bg-black w-1/3 rounded-full"></div> */}
        <Link href="/" passHref>
          <div>
            <Image
              alt="Brand Logo"
              width={120}
              height={120}
              className="m-1 cursor-pointer"
              src="/images/StopTheCapLogo-Black.png"
              objectFit="contain"
            />
          </div>
        </Link>
        {/* <div className="ml-5 h-2px bg-black w-1/3 rounded-full"></div> */}
      </div>
      {/* <div className="w-full py-32 bg-shop-banner mt-10  bg-center"></div> */}

      <div className="catalog-container w-full p-10">
        <div className="filters w-1/4">
          <ShopFilters />
        </div>
        <div className="grid w-3/4"></div>
      </div>
    </div>
  );
}
