// import styles from './product.module.css';

import shopify from "../../shopify/product";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import Link from 'next/link';
import { connect, useDispatch } from "react-redux";
import { selectVariantAction } from "../../actions/product/product-actions";
import ProductCarousel from "../../components/sub-components/product-carousel";
import Reviews from "../../components/sub-components/reviews-stars";
import QuantityPicker from "../../components/sub-components/quantity-picker";
import PdpProductOptions from "../../components/sub-components/pdp-product-options";
import findOptionsIndexInShopifyResponse from "../../util/findVariantOptionIndex";
import PdpImageGrid from "../../components/sub-components/pdp-image-grid";
import PdpCollapsibles from "../../components/sub-components/pdp-collapsibles";

function ProductPage(props) {
  useEffect(() => {
    document.body.firstChild.firstChild.scrollTo(0, 0);
  }, []);
  let dispatch = useDispatch();
  function selectVariant(variant) {
    dispatch(selectVariantAction(variant));
  }
  let variants = props.product.product.variants.edges;
  let title = props.product.product.title;
  let selected = props.product.selectedVariant;
  let description = props.product.product.description;
  let images = props.product.product.images.edges.map((obj) => obj.node.originalSrc);
  let variantsExist = props.product.product.variantsExist;
  let primaryOptionExist = props.product.product.primaryOptionExist;
  let primaryOption = "color";
  let primaryOptionIndex = findOptionsIndexInShopifyResponse(variants[0].node.selectedOptions)[primaryOption];

  function filterByPrimaryOption(variants) {
    if (variantsExist && primaryOptionExist) {
      let primaryOptionArray = {};
      variants.map(({ node }) => {
        if (!primaryOptionArray[node.selectedOptions[primaryOptionIndex].value]) {
          primaryOptionArray[node.selectedOptions[primaryOptionIndex].value] = node;
        }
      });
      return primaryOptionArray;
    }
  }
  function filterOptionsIntoArrays(variants) {
    let otherOptions = {};
    if (variantsExist) {
      let options = variants[0].node.selectedOptions;
      options.forEach((option, ind) => {
        otherOptions[option.name.toLowerCase()] = [];
        variants.forEach(({ node }) => {
          if (otherOptions[option.name.toLowerCase()].indexOf(node.selectedOptions[ind].value.toLowerCase()) < 0) {
            otherOptions[option.name.toLowerCase()].push(node.selectedOptions[ind].value.toLowerCase());
          }
        });
      });
    }
    return otherOptions;
  }
  let optionsArrays = useMemo(() => filterOptionsIntoArrays(variants));
  let primaryOptionObj = useMemo(() => filterByPrimaryOption(variants));

  return (
    <div className="pl-5 pr-5 pb-5 mt-classic-header ">
      <div className=" flex flex-col items-center">
        <div className="flex w-2/3 justify-center items-center -mt-1">
          <div className="mr-5 h-2px bg-theme-blue w-1/3 rounded-full"></div>
          <Link href="/" passHref>
            <div>
          <Image
            alt="Brand Logo"
            width={100}
            height={100}
            className="m-1 cursor-pointer"
            src="/images/StopTheCapLogo-Black.png"
            objectFit="contain"
          />
          </div>
          </Link>
   
          <div className="ml-5 h-2px bg-theme-blue w-1/3 rounded-full"></div>
        </div>
        <div className="flex w-full h-full mt-3 xxs:flex-col lg:flex-row max-w-screen-2xl">
          <div className="images lg:w-1/2 xxs:w-full">
            <div className="w-full xxs:h-96 lg:h-full lg:p-10">
              {variantsExist ? (
                <ProductCarousel
                  primaryOptionIndex={primaryOptionIndex}
                  primaryOption={primaryOption}
                  variants={primaryOptionObj}
                  selectedVariant={selected}
                  selectVariant={selectVariant}
                />
              ) : (
                <img src={images[0]} alt={title} className=" w-full object-fill rounded" />
              )}
            </div>
          </div>
          <div className="description lg:mt-0 xxs:mt-12 lg:p-10 lg:w-1/2">
            <div className="breadcrumbs text-xs">{`Home > Car Gadgets > ${title}`}</div>
            <div className="mt-5 text-2xl font-bold">{title}</div>
            <div className="mt-5 text-xs font-light text-gray-400">{`SKU: ${selected.sku}`}</div>
            <div className="mt-5 text-4xl text-red-500 font-bold">{"$" + selected.priceV2.amount}</div>
            <Reviews />
            <div className="mt-5 text-xs">{description}</div>
            <PdpProductOptions options={optionsArrays} selectVariant={selectVariant} />
            <div className="flex mt-8">
              <QuantityPicker quantity={5} />
              <button className="rounded bg-red-500 pl-10 pr-10 ml-3 text-white">Add To Cart</button>
            </div>
            {/* <div className="h-2px bg-black rounded-full mt-6"></div> */}
          </div>
        </div>
      </div>
      <div className="flex xxs:flex-col lg:flex-row mt-5">
        <div className="xxs:w-full lg:w-1/2">
          <PdpImageGrid images={images}/>
        </div>
        <div className="w-1/2 pl-10 pr-10">
          <PdpCollapsibles />
        </div>
      </div>
      <div className="related products"></div>
    </div>
  );
}

function stateToProps(state) {
  return {
    product: state.products.pdp,
    selectedVariant: state.products.pdp.selectVariant,
  };
}
export default connect(stateToProps, null)(ProductPage);

export const getStaticProps = async ({ params }) => {
  const product = await shopify.getProduct(params.product);
  product.variantsExist = product.variants.edges.length > 1 ? true : false;
  product.primaryOptionExist = product.variants.edges[0].node.selectedOptions.find((option) => option.name.toLowerCase() === "color");
  let firstVariant = product.variants.edges[0].node;
  firstVariant.carouselIndex = 0;
  return {
    props: {
      initialReduxState: {
        products: {
          pdp: {
            product: product,
            selectedVariant: firstVariant,
          },
        },
      },
    },
  };
};

export async function getStaticPaths() {
  const products = await shopify.recursiveCatalog();
  const paths = products.map((item) => {
    const product = String(item.node.handle);
    return {
      params: { product },
    };
  });
  return {
    paths,
    fallback: false,
  };
}
