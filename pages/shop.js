import React, { createRef, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import shopify from "../shopify/shopify-funcs";
import ShopGrid from "../components/sub-components/shop-grid";
import ShopFilters from "../components/sub-components/shop-filters";
import { useSelector } from "react-redux";

export default function Shop(props) {
  let filters = useSelector(({products}) => products.shopFilters);
  let logo = createRef();
  let pageLoaded = useRef(false);

  useEffect(() => {
    if(logo.current!== null && pageLoaded.current!==null && pageLoaded.current === true) {
      logo.current.scrollIntoView({behavior: "smooth", block: "start"});
    }
  },[filters.price, filters.categories]);

  useEffect(() => {
    pageLoaded.current=true;
  },[]);
  
  return (
    <div className="min-h-screen pt-20 flex flex-wrap justify-center">
      <div ref={logo} className="flex w-full justify-center items-center -mt-1">
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
      </div>
      {/* <div className="w-full py-32 bg-shop-banner mt-10  bg-center"></div> */}

      <div className="catalog-container w-full p-10 flex justify-center max-w-screen-2xl">
        <div className="filters w-1/5 sticky top-20 left-5 self-start xxs:hidden lg:block">
          <ShopFilters />
        </div>
        <div  className="grid w-4/5 relative ">
          <ShopGrid />
        </div>
      </div>
    </div>
  );
}
export const getStaticProps = async () => {
  let products = await shopify.shopCatalog();
  let collections = await shopify.getCollections();
  return {
    props: {
      initialReduxState: {
        products: {
          recommendations: [],
          wishlist: [],
          wishlistSearchSource: [],
          shop: products,
          unfilteredShop: products,
          collections: collections.edges,
          shopFilters: {
            price: {
              lowestPrice: 0,
              highestPrice: 0,
            },
            categories: [],
            onSale: false
          },
        },
      },
    },
  };
};
