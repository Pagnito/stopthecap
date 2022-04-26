import React, { createRef, useEffect } from "react";
import { RiShoppingBagLine, RiHeartLine, RiSearchLine } from "react-icons/ri";
import { CgMenuRound } from "react-icons/cg";
import { toggleSearch, toggleCart, toggleWishlist } from "../../actions/app/app-actions";
import { useDispatch, useSelector } from "react-redux";
import useHeader from "../../use/useHeader";
import { useRouter } from "next/router";
import Link from "next/link";

const ClassicHeader = ({openMobileNav}) => {
  let router = useRouter();
  let header = createRef();
  let dispatch = useDispatch();
  let app = useSelector(({app}) => app);
  let {toggleHeaderWatcher, toggleWindowScrollEvent, handleRouteChange, state, cartItemsAmount} = useHeader(router);
  let pathname = router.pathname;

  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  useEffect(() => {
    toggleWindowScrollEvent(pathname);
    toggleHeaderWatcher(pathname);
    return () => {
      toggleWindowScrollEvent(pathname);
    };
  }, []);

  return (
    <header ref={header} className={`${state.headerStyles} w-full pt-4 pb-4 fixed top-0 z-10`}>
      <div className="flex justify-between">
        <div className="flex  xxs:hidden sm:flex">
          <Link href="/" passHref>
            <div
              className={`ml-3 cursor-pointer hover:text-red-500 hover:border-red-500 transition-colors border-white border-2 ${state.headerButtonStyles} rounded-full pt-2 pb-2 pr-3 pl-3`}
            >
              Home
            </div>
          </Link>
          <Link href="/about" passHref>
            <div
              className={`ml-3 cursor-pointer hover:text-red-500 hover:border-red-500 transition-colors border-white border-2 ${state.headerButtonStyles} rounded-full pt-2 pb-2 pr-3 pl-3`}
            >
              About
            </div>
          </Link>
          <Link href="/contact" passHref>
            <div
              className={`ml-3 cursor-pointer hover:text-red-500 hover:border-red-500 transition-colors border-white border-2 ${state.headerButtonStyles} rounded-full pt-2 pb-2 pr-3 pl-3`}
            >
              Contact
            </div>
          </Link>
          <Link href="/shop" passHref>
            <div
              className={`ml-3 cursor-pointer hover:text-red-500 hover:border-red-500 transition-colors border-white border-2 ${state.headerButtonStyles} rounded-full pt-2 pb-2 pr-3 pl-3`}
            >
              Shop
            </div>
          </Link>
        </div>
        <div className="xxs:block sm:hidden">
          <CgMenuRound
            onClick={openMobileNav}
            className={`my-icon-style ml-3 flex rounded-full p-2 border-2 hover:border-red-500 transition-colors cursor-pointer ${state.headerButtonStyles}`}
            color={state.headerIconStyles}
            size="43px"
          />
        </div>
        <div></div>
        <div className="sm:w-1/3">
        {/* ${app.searchVisible || app.cartVisible || app.wishlistVisible || app.quickViewVisible ? 'pr-14px' : ''} */}
          <div className={`flex justify-end align-middle xxs:pr-1 `}>
            <RiSearchLine
              onClick={() => dispatch(toggleSearch())}
              className={`my-icon-style mr-7 flex rounded-full p-2 border-2 hover:border-red-500 transition-colors cursor-pointer ${state.headerButtonStyles}`}
              color={state.headerIconStyles}
              size="43px"
            />

            <RiHeartLine
            onClick={() => dispatch(toggleWishlist())}
              className={`mr-7 my-icon-style flex rounded-full p-2 border-2 hover:border-red-500 transition-colors cursor-pointer ${state.headerButtonStyles} my-icon-style-heart`}
              color={state.headerIconStyles}
              size="43px"
            />

            <div className="mr-3 flex relative">
              {cartItemsAmount > 0 ? (
                <div onClick={() => dispatch(toggleCart())} className="cursor-pointer absolute flex z-10 border-white border-solid border-2 justify-center items-center h-7 w-7 text-white line-h-.5 bg-red-500 rounded-full text-xs -right-3 -top-2">
                  {cartItemsAmount}
                </div>
              ) : (
                false
              )}
              <RiShoppingBagLine
                onClick={() => dispatch(toggleCart())}
                className={`${state.headerButtonStyles} rounded-full p-2 border-2 hover:border-red-500 my-icon-style transition-colors cursor-pointer`}
                color={state.headerIconStyles}
                size="43px"
              />
            </div>

            {/* <div className="m-10"></div> */}
          </div>
        </div>
      </div>
    </header>
  );
};
export default ClassicHeader;
