import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function useHeader(router) {
  let scrollEventCreated = false;
  let headerWatcher = null;
  let didScroll;
  let lastScrollTop = 0;
  let delta = 5;
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


  useEffect(() => {
    setCartItemsAmount(cart.items.length);
  }, [cart.items]);

  const handleRouteChange = (url) => {
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

  let setScrollState = () => {
    didScroll = true;
  };

  return {
    toggleHeaderWatcher,
    toggleWindowScrollEvent,
    handleRouteChange,
    state,
    cartItemsAmount
  }
}