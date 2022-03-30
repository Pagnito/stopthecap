import React from "react";
import { RiCloseFill } from "react-icons/ri";
import ShopFilters from "./shop-filters/shop-filters";

export default function MobileShopFilters(props) {
  return (
    <div className="fixed shadow-xl z-40 top-0 flex flex-col -translate-x-full animate-doors-close bg-white h-screen w-full">
      <div onClick={props.closeMobileShopFilters} className="cursor-pointer z-50 scale-0 animate-close-x absolute top-5 right-5">
        <RiCloseFill size="35px" color="black" />
      </div>
      <div className="w-full text-xl flex justify-center mt-6">Filters</div>
      <div className="xxs:p-4 sm:p-10">
        <ShopFilters />
        <button onClick={props.closeMobileShopFilters} type="button" className="mt-3 hover:bg-yellow-500 transition-colors relative bg-black text-white w-full rounded p-3">
        Apply
      </button>
      </div>

    </div>
  );
}
