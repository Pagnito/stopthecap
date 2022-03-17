import React from "react";
import Link from "next/link";
import Image from "next/image";
import shopify from '../shopify/shopify-funcs';
import ShopGrid from "../components/sub-components/shop-grid";
import ShopFilters from "../components/sub-components/shop-filters";

export default function Shop(props) {
  return (
    <div className="min-h-screen pt-20 flex flex-wrap">
      <div className="flex w-full justify-center items-center -mt-1">
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
      
      <div className="catalog-container w-full p-10 flex">
        <div className="filters w-1/5 sticky top-10">
          <ShopFilters />
        </div>
        <div className="grid w-4/5 relative">
          <ShopGrid  />
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
          collections: collections.edges
        },
      },
    },
  };
}