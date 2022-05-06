import React, { createRef, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import shopify from "../shopify/shopify-funcs";
import ShopGrid from "../components/sub-components/shop-grid";
import ShopFilters from "../components/sub-components/shop-filters/shop-filters";
import { toggleMobileShopFilters } from "../actions/app/app-actions";
import { BiSliderAlt } from "react-icons/bi";
import { RiArrowDropRightLine } from "react-icons/ri";
import { BsSquareFill, BsFillGridFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import mongo from '../use/use-mongo';
import filterReviewsByProduct from "../util/filterReviewsByProduct";

export default function Shop(props) {
  let filters = useSelector(({ products }) => products.shopFilters);
  let logo = createRef();
  let pageLoaded = useRef(false);
  let dispatch = useDispatch();

  useEffect(() => {
    if (logo.current !== null && window !== null) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [filters]);

  useEffect(() => {
    pageLoaded.current = true;
  }, []);

  let mobileShopFilterLinks = (
    <div className="lg:hidden z-10 flex px-5 pb-5 justify-between ">
      <div onClick={() => dispatch(toggleMobileShopFilters())} className="flex items-center">
        <BiSliderAlt size="20px" />
        <div className="ml-1 flex items-center">Filters</div>
        <RiArrowDropRightLine size="31px" className="ml-2 cursor-pointer" />
      </div>
      <div className="flex items-center justify-center">
        <BsSquareFill className="mr-2" size="19px" />
        <BsFillGridFill size="20px" />
      </div>
    </div>
  );
  return (
    <div className="min-h-screen pt-20 flex flex-col justify-start items-center">
      <div ref={logo} className="flex w-full justify-center items-start just -mt-1">
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

      <div className="catalog-container w-full p-2 lg:p-10 flex xxs:flex-col lg:flex-row justify-center max-w-screen-2xl">
        <div className="filters w-1/5 sticky top-20 left-5 self-start xxs:hidden lg:block">
          <ShopFilters />
        </div>
        {mobileShopFilterLinks}
        <div className="grid xxs:w-full lg:w-4/5 relative pb-20">
          <ShopGrid />
        </div>
      </div>
    </div>
  );
}
export const getStaticProps = async () => {
  let products = await shopify.shopCatalog();
  let collections = await shopify.getCollections();
  let productHandles = products.map(product => product.node.handle);
  let reviews = await mongo.getReviewsForProducts(productHandles);
  reviews.forEach(review => {
    review._id = review._id.toString();
    let match = products.findIndex(product => product.node.handle === review.product_handle);
    if(match > -1){
      if(products[match].node.reviews) {
        products[match].node.reviews.push(review);
      } else {
        products[match].node.reviews = [review];
      }
    }

  })
  return {
    props: {
      initialReduxState: {
        products: {
          recommendations: [],
          shop: products,
          unfilteredShop: products,
          collections: collections.edges,
          allProducts: [],
          searchedProducts:[],
          shopFilters: {
            price: {
              lowestPrice: 0,
              highestPrice: 0,
            },
            categories: [],
            onSale: false,
          },
        },
      },
    },
  };
};
