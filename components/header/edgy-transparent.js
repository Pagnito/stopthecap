import React, { useEffect } from "react";
import Image from "next/image";
import { RiShoppingBagLine, RiHeartLine, RiSearchLine } from "react-icons/ri";
import { toggleSearch } from "../../actions/app-actions";
import { useDispatch, useSelector } from "react-redux";
import SearchModal from "../sub-components/search-modal";

const EdgyTransparentHeader = (props) => {

  let app = useSelector((state) => state.app);
  let dispatch = useDispatch();
  return (
    <header className="z-10 w-full bg-gray-dark flex justify-between absolute">
      <div className="flex flex-col w-1/3">
        <div className="animate-down opacity-0 -translate-y-3 xxs:w-1/3 sm:w-1/5 transition-colors  cursor-pointer flex border-l-2  border-solid border-red-500 hover:text-white text-red-500 p-2 m-4">
          <div className="">USD</div>
          <div className="ml-2 font-super-bold -rotate-90 font-xs">{"<"}</div>
        </div>
        <div className="block xxs:hidden md:block text-white ml-12 mt-10 transition-opacity">
          <div className="animate-link-one opacity-0 -translate-x-2 mt-3 cursor-pointer hover:text-red-500 transition-colors">
            01 . Home
          </div>
          <div className="animate-link-two opacity-0 -translate-x-2 mt-3 cursor-pointer hover:text-red-500 transition-colors">
            02. About
          </div>
          <div className="animate-link-three opacity-0 -translate-x-2 mt-3 cursor-pointer hover:text-red-500 transition-colors">
            03. Contact
          </div>
          <div className="animate-link-four opacity-0 -translate-x-2 mt-3 cursor-pointer hover:text-red-500 transition-colors">
            04. Shop
          </div>
        </div>
      </div>

      <div className="flex justify-center sm:w-1/3">
        <div className="mt-2 xxs:hidden md:block opacity-0 stamp-animate">
          <Image
            alt="Brand Logo"
            width={110}
            height={110}
            className="m-1 cursor-pointer"
            src="/images/StopTheCap-Favicon-White.png"
            objectFit="contain"
          />
        </div>
      </div>
      <div className="sm:w-1/3">
        <div className="flex animate-down opacity-0 -translate-y-3 justify-end align-middle xxs:pr-1 xs:pr-5">
          <div onClick={() => dispatch(toggleSearch())} className="mt-5 mr-7">
            <RiSearchLine className="my-icon-style" color="white" size="25px" />
          </div>
          <div className="mt-5 mr-7 my-icon-style">
            <RiHeartLine
              className="my-icon-style-heart"
              color="white"
              size="25px"
            />
          </div>
          <div className="mt-5 mr-7">
            <RiShoppingBagLine
              className="my-icon-style"
              color="white"
              size="25px"
            />
          </div>

          {/* <div className="m-10"></div> */}
        </div>
      </div>
      {app.searchVisible ? (
        <SearchModal hideSearchModal={() => dispatch(toggleSearch())} open={app.searchVisible} />
      ) : (
        false
      )}
    </header>
  );
};

// function stateToProps(state){
//   return {
//     app: state.app
//   }
// }

export default EdgyTransparentHeader;
