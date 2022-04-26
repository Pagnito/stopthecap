import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedProducts } from "../actions/products/products-actions";

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
  let allProducts = useSelector(({products}) => products.allProducts);
  let dispatch = useDispatch();
  let setScrollState = () => {
    didScroll = true;
  };

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
  const searchProducts = (keyword) => {
    let keywords = keyword.toLowerCase().split(' ');
    let searched = allProducts.filter((product) => {
      let title = product.node.title.replace('|','').toLowerCase();
      let match = keywords.find(word => {
        return title.indexOf(word) > -1 || product.node.productType.toLowerCase().indexOf(word) > -1 ||
        product.node.tags.indexOf(word) > -1;
      })
      return match
    });
    dispatch(setSearchedProducts(searched));
  }


  return {
    toggleHeaderWatcher,
    toggleWindowScrollEvent,
    handleRouteChange,
    state,
    cartItemsAmount,
    searchProducts
  }
}