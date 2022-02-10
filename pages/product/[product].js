// import styles from './product.module.css';

import shopify from "../../shopify/product";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { connect, useDispatch } from "react-redux";
import { selectVariantAction } from "../../actions/product/product-actions";
import Reviews from "../../components/sub-components/reviews";
import QuantityPicker from "../../components/sub-components/quantity-picker";
import { Carousel } from "react-responsive-carousel";

function ProductPage(props) {
  useEffect(() => {
    document.body.firstChild.firstChild.scrollTo(0, 0);
  }, []);
  let dispatch = useDispatch();
  let images = props.product.product.images.edges.map(
    (obj) => obj.node.originalSrc
  );
  let title = props.product.product.title;
  let selected = props.product.selectedVariant;
  let description = props.product.product.description;
  // console.log(selected);

  // function filterDataSizesPerColor(variants) {
  //   let sizesByColor = {};
  //   variants.map(variant1 => {
  //     variants.forEach(variant2 => {
  //       if(variant1.node.selectedOptions[0].value===variant2.node.selectedOptions[0].value) {
  //         let color = variant1.node.selectedOptions[0].value;
  //         if(!sizesByColor.hasOwnProperty(color)) {
  //           sizesByColor[color] = {};
  //         }
  //         let size = variant2.node.selectedOptions[1].value;
  //         if(variant1.node.selectedOptions[0].value===variant2.node.selectedOptions[0].value && !sizesByColor[color][size]){
  //           sizesByColor[color][size] = variant2;
  //         }
  //       }
  //     })
  //   });
  //   return sizesByColor;
  // }
  // let sizesByColor = useMemo(() => filterDataSizesPerColor(props.product.product.variants.edges));

  return (
    <div className="min-h-screen pl-5 pr-5 pb-5 mt-classic-header">
      <div className="flex justify-center items-center -mt-2">
        <div className="mr-5 h-2px bg-theme-blue w-1/3 rounded-full"></div>
        <Image
          alt="Brand Logo"
          width={100}
          height={100}
          className="m-1 cursor-pointer"
          src="/images/StopTheCapLogo-Black.png"
          objectFit="contain"
        />
        <div className="ml-5 h-2px bg-theme-blue w-1/3 rounded-full"></div>
      </div>
      <div className="flex w-full h-full mt-3 xxs:flex-col md:flex-row">
        <div className="images md:w-1/2">
          <div className="w-full p-10">
            <img
              src={images[0]}
              alt={title}
              className=" w-full object-fill rounded"
            />
            {/* 
            <Carousel
              // renderIndicator={couraselIndicator}
              showStatus={false}
              swipeable={true}
              showThumbs={true}
              animationHandler={""}
              infiniteLoop={true}
              interval={10000}
            /> */}
          </div>
        </div>
        <div className="description p-10 md:w-1/2">
          <div className="breadcrumbs text-xs">
            {`Home > Car Gadgets > ${title}`}
          </div>
          <div className="mt-5 text-2xl font-bold">{title}</div>
          <div className="mt-5 text-xs font-light text-gray-400">{`SKU: ${selected.sku}`}</div>
          <div className="mt-5 text-4xl text-red-500 font-bold">
            {"$" + selected.price.amount}
          </div>
          <Reviews />
          <div className="mt-5 text-xs">{description}</div>
          <div className="mt-6">{`COLOR`}</div>

          <div className="mt-4">{`SIZE`}</div>
          <div className="flex mt-5">
            <QuantityPicker quantity={5} />
            <button className="rounded bg-red-500 pl-10 pr-10 ml-3 text-white">
              Add To Cart
            </button>
          </div>
          <div className="h-px bg-gray-400 rounded-full mt-5"></div>
        </div>
      </div>
      <div className="related products"></div>
      {/* <ProductPageImageCarousel variants={sizesByColor}selectVariant={props.selectVariant} />
      <ProductPageItemInfo variants={sizesByColor} selectVariant={props.selectVariant} /> */}
    </div>
  );
}

function stateToProps(state) {
  return {
    product: state.products.pdp,
  };
}
export default connect(stateToProps, null)(ProductPage);

export const getStaticProps = async ({ params }) => {
  const product = await shopify.getProduct(params.product);
  let firstVariant = product.variants.edges[0].node;
  let firstVariantValues = {
    color: firstVariant.selectedOptions[0].value,
    size: firstVariant.selectedOptions[1].value,
    colorIndex: 0,
    sku: firstVariant.sku,
    availableAmount: firstVariant.quantityAvailable,
    price: firstVariant.priceV2,
  };
  return {
    props: {
      initialReduxState: {
        products: {
          pdp: {
            product: product,
            selectedVariant: firstVariantValues,
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
