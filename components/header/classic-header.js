import React from "react";
import { RiShoppingBagLine, RiHeartLine, RiSearchLine } from "react-icons/ri";
import { toggleSearch } from "../../actions/app/app-actions";
import { useDispatch, useSelector } from "react-redux";
import SearchModal from "../sub-components/search-modal";

const ClassicHeader = (props) => {
  let app = useSelector((state) => state.app);
  let dispatch = useDispatch();
  return (
    <header className="w-full pt-4 pb-4 fixed top-0  z-10">

      <div className="flex justify-between">
        <div className="flex text-white">
          <div className="ml-3 cursor-pointer hover:text-red-500 hover:border-red-500 transition-colors border-white border-2 bg-white-tr-60 rounded-full pt-2 pb-2 pr-3 pl-3">
            Home
          </div>
          <div className="ml-3 cursor-pointer hover:text-red-500 hover:border-red-500 transition-colors border-white border-2 bg-white-tr-60 rounded-full pt-2 pb-2 pr-3 pl-3">
            About
          </div>
          <div className="ml-3 cursor-pointer hover:text-red-500 hover:border-red-500 transition-colors border-white border-2 bg-white-tr-60 rounded-full pt-2 pb-2 pr-3 pl-3">
            Contact
          </div>
          <div className="ml-3 cursor-pointer hover:text-red-500 hover:border-red-500 transition-colors border-white border-2 bg-white-tr-60 rounded-full pt-2 pb-2 pr-3 pl-3">
            Shop
          </div>
        </div>
        <div></div>
        <div className="sm:w-1/3">
          <div className="flex justify-end align-middle xxs:pr-1">
            <div
              onClick={() => dispatch(toggleSearch())}
              className="mr-7 flex rounded-full p-2 border-white border-2 hover:border-red-500 transition-colors cursor-pointer bg-white-tr-60 
bg-white-tr-60 "
            >
              <RiSearchLine
                className="my-icon-style"
                color="white"
                size="25px"
              />
            </div>
            <div
              className="mr-7 my-icon-style flex rounded-full p-2 border-white border-2 hover:border-red-500 transition-colors cursor-pointer bg-white-tr-60 
bg-white-tr-60 "
            >
              <RiHeartLine
                className="my-icon-style-heart"
                color="white"
                size="25px"
              />
            </div>
            <div
              className="mr-3 flex rounded-full p-2 border-white border-2 hover:border-red-500 transition-colors cursor-pointer bg-white-tr-60 
bg-white-tr-60 "
            >
              <RiShoppingBagLine
                className="my-icon-style"
                color="white"
                size="25px"
              />
            </div>

            {/* <div className="m-10"></div> */}
          </div>
        </div>
      </div>
      {app.searchVisible ? (
        <SearchModal
          hideSearchModal={() => dispatch(toggleSearch())}
          open={app.searchVisible}
        />
      ) : (
        false
      )}
    </header>
  );
};
export default ClassicHeader;
