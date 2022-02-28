import React, { createRef, useEffect, useState } from "react";
import { RiShoppingBagLine, RiHeartLine, RiSearchLine } from "react-icons/ri";
import { toggleSearch, toggleCart, toggleWishlist } from "../../actions/app/app-actions";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";

const ClassicHeader = (props) => {
  let router = useRouter();
  let [pathname, setPathname] = useState(router.pathname);
  let app = useSelector(({app}) => app);
  let didScroll;
  let lastScrollTop = 0;
  let delta = 5;
  let header = createRef();
  let scrollEventCreated = false;
  let headerWatcher = null;
  let initState = {
    headerButtonStyles:
      router.pathname === "/" || router.pathname === "/contact"
        ? "border-white bg-theme-blue text-white"
        : "bg-white-tr-20 text-theme-blue border-theme-blue",
    headerIconStyles: router.pathname === "/" || router.pathname === "/contact" ? "white" : "#180F2E",
    headerStyles: router.pathname === "/" ? "moving-header" : "moving-header moving-header-down",
  };

  let [state, setState] = useState(initState);
  let [cartItemsAmount, setCartItemsAmount] = useState(0);
  let cart = useSelector((state) => state.cart);
  useEffect(() => {
    setCartItemsAmount(cart.items.length);
  }, [cart.items]);
  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      // setPathname(url);
      if (url !== "/") {
        toggleWindowScrollEvent(url);
        toggleHeaderWatcher(url);
        if (url == "/contact") {
          setState({
            headerButtonStyles: "border-white bg-theme-blue text-white",
            headerIconStyles: "white",
            headerStyles: "moving-header moving-header-down",
          });
        } else {
          setState({
            headerButtonStyles: "bg-white-tr-20 text-theme-blue border-theme-blue",
            headerIconStyles: "#180F2E",
            headerStyles: "moving-header moving-header-down",
          });
        }
      } else if (url === "/") {
        toggleWindowScrollEvent(url);
        toggleHeaderWatcher(url);
        setState({
          headerButtonStyles: "border-white bg-theme-blue text-white",
          headerIconStyles: "white",
          headerStyles: "moving-header",
        });
      }
    };
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

  // run hasScrolled() and reset didScroll status
  let toggleWindowScrollEvent = (pathname) => {
    if (scrollEventCreated === false && pathname === "/") {
      scrollEventCreated = true;
      window.addEventListener("scroll", setScrollState);
    } else {
      window.removeEventListener("scroll", setScrollState);
      didScroll = false;
      scrollEventCreated = false;
    }
  };

  let toggleHeaderWatcher = (pathname) => {
    if (headerWatcher === null && pathname === "/") {
      headerWatcher = setInterval(function () {
        if (didScroll) {
          hasScrolled(pathname);
          didScroll = false;
        }
      }, 250);
    } else {
      didScroll = false;
      clearInterval(headerWatcher);
      headerWatcher = null;
    }
  };

  let setScrollState = () => {
    didScroll = true;
  };

  function hasScrolled(pathname) {
    let viewPosition = window.scrollY;
    if (Math.abs(lastScrollTop - viewPosition) <= delta) return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (pathname === "/") {
      if (viewPosition > lastScrollTop && viewPosition > 100) {
        // Scroll Down
        setState({
          headerButtonStyles: "border-white bg-theme-blue text-white",
          headerIconStyles: "white",
          headerStyles: "moving-header moving-header-down",
        });
      } else {
        // Scroll Up
        if (viewPosition < 600) {
          setState({
            headerButtonStyles: "border-white bg-theme-blue text-white",
            headerIconStyles: "white",
            headerStyles: "moving-header",
          });
        }
      }
    }

    lastScrollTop = viewPosition;
  }

  let dispatch = useDispatch();
  return (
    <header ref={header} className={`${state.headerStyles} w-full pt-4 pb-4 fixed top-0 z-10`}>
      <div className="flex justify-between">
        <div className="flex">
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
        <div></div>
        <div className="sm:w-1/3">
          <div className={`${app.searchVisible || app.cartVisible || app.wishlistVisible ? 'pr-14px' : ''} flex justify-end align-middle xxs:pr-1`}>
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
