import Head from 'next/head';
import styles from './layout.module.css';
import Footer from './footer/classic-footer';
import ClassicHeader from "./header/classic-header";
import CartModal from "./cart/drawer-cart";
import { toggleSearch, toggleCart, toggleWishlist, toggleProductQuickView } from "../actions/app/app-actions";
import { setWishlist } from '../actions/products/products-actions';
import SearchModal from "./sub-components/search-modal";
import {connect, useDispatch} from 'react-redux';
import {loadCheckoutFromLocalStorage} from '../actions/cart/cart-actions';
import useCart from '../use/useCart';
import { useEffect } from 'react';
import WishlistModal from './wishlist.js/wishlist';
import ProductQuickView from './product-quick-view/product-quick-view';

const Layout = ({ children, app }) => {
  let dispatch = useDispatch();
  let {getCheckoutFromLocalStorage} = useCart();
  
  useEffect(() => {
    let savedCheckout = getCheckoutFromLocalStorage();
    if(savedCheckout) {
      dispatch(loadCheckoutFromLocalStorage(savedCheckout));
      dispatch(setWishlist());
    }
  },[])
  return (
    <div className={styles.app}>
      <Head>
        <title>Stop The Cap</title>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {app.cartVisible ? <CartModal hideCartModal={() => dispatch(toggleCart())} open={app.cartVisible} /> : false}
      {app.searchVisible ? <SearchModal hideSearchModal={() => dispatch(toggleSearch())} open={app.searchVisible} /> : false}
      {app.wishlistVisible ? <WishlistModal hideWishlistModal={() => dispatch(toggleWishlist())} open={app.searchVisible} /> : false}
      {app.quickViewVisible ? <ProductQuickView hideQuickView={() => dispatch(toggleProductQuickView())} open={app.quickViewVisible} /> : false}
      <ClassicHeader />
      <div>
        <main>
          {children}
        </main>
        <Footer />
      </div>
  
    </div>
  )
}
function stateToProps(state) {
  return {
    app: state.app
  }
}
export default connect(stateToProps, null)(Layout);