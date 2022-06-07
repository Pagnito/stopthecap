import Head from "next/head";
import Footer from "./sections/footer/classic-footer";
import ClassicHeader from "./sections/header/classic-header";
import CartModal from "./modals/drawer-cart";
import {
  toggleSearch,
  toggleCart,
  toggleWishlist,
  toggleProductQuickView,
  toggleMobileNav,
  toggleMobileShopFilters,
} from "../actions/app/app-actions";
import { setWishlist } from "../actions/cart/cart-actions";
import SearchModal from "./modals/search-modal";
import { connect, useDispatch } from "react-redux";
import { loadCheckoutFromLocalStorage } from "../actions/cart/cart-actions";
import { useEffect } from "react";
import WishlistModal from "./modals/wishlist";
import ProductQuickView from "./modals/product-quick-view";
import MobileShopFilters from "./sub-components/mobile-shop-filters";
import MobileNav from "./sections/header/mobile-nav";

const Layout = ({ children, app }) => {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCheckoutFromLocalStorage());
    dispatch(setWishlist());
  }, []);
  return (
    <div>
      <Head>
        <title>Stop The Cap</title>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="facebook-domain-verification" content="vahg2lwylcfa1owlai0r9yxbypaltw" />
      </Head>
      {app.cartVisible ? <CartModal hideCartModal={() => dispatch(toggleCart())} open={app.cartVisible} /> : false}
      {app.searchVisible ? <SearchModal hideSearchModal={() => dispatch(toggleSearch())} open={app.searchVisible} /> : false}
      {app.wishlistVisible ? <WishlistModal hideWishlistModal={() => dispatch(toggleWishlist())} open={app.searchVisible} /> : false}
      {app.quickViewVisible ? (
        <ProductQuickView hideQuickView={() => dispatch(toggleProductQuickView())} open={app.quickViewVisible} />
      ) : (
        false
      )}
      {app.mobileNavVisible ? <MobileNav closeMobileNav={() => dispatch(toggleMobileNav())} /> : false}
      {app.mobileShopFiltersVisible ? <MobileShopFilters closeMobileShopFilters={() => dispatch(toggleMobileShopFilters())} /> : false}
      <ClassicHeader openMobileNav={() => dispatch(toggleMobileNav())} />
      <div>
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};
function stateToProps(state) {
  return {
    app: state.app,
  };
}
export default connect(stateToProps, null)(Layout);
