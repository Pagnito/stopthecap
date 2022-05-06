import React, { createRef, useEffect, useState } from "react";
import { RiCloseFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../actions/products/products-actions";
import { useRouter } from "next/router";
import useHeader from "../../use/useHeader";
import SearchedProduct from "./searched-product";
import SelfAds from "./self-ads";
export default function SearchModal(props) {
  let [search, setSeach] = useState("");
  let dispatch = useDispatch();
  let router = useRouter();
  let { searchProducts } = useHeader(router);
  let searchedProducts = useSelector(({ products }) => products.searchedProducts);

  let input = createRef();

  useEffect(() => {
    if (input.current !== null) {
      input.current.focus();
    }
    dispatch(getAllProducts());
  }, []);

  const products = searchedProducts.slice(0, 10).map((product, ind) => {
    return (
      <div key={product.node.id} className={`${ind > 0 ? "mt-5" : ""}`}>
        <SearchedProduct product={product.node} />
      </div>
    );
  });
  const searchProductsOnInput = (value) => {
    setSeach(value);
    searchProducts(search);
  }
  return (
    <div className="fixed z-40 top-0 flex flex-col justify-center items-center h-screen w-full p-20">
      <div onClick={props.hideSearchModal} className="cursor-pointer z-50 scale-0 animate-close-x absolute top-5 right-5">
        <RiCloseFill size="35px" color="white" />
      </div>
      <div className="w-full px-14 z-50 flex justify-center">
        <input
          ref={input}
          autoFocus={true}
          className="caret-red-500 py-1 bg-white text-2xl animate-width-open text-center no-outline w-0 text-black border-solid border-2 rounded"
          value={search}
          onChange={(e) => searchProductsOnInput(e.target.value)}
        />
      </div>
      {search.length > 0 ? (
        <div className="w-full h-full z-40 hide-scrollbar overflow-y-scroll overflow-x-hidden rounded mt-10 px-20">{products}</div>
      ) : (
        <SelfAds />
      )}

      <div className="flex fixed top-0 w-full h-screen">
        <div className="bg-black z-50 opacity-80 w-1/2 -translate-x-full animate-doors-close"></div>
        <div className="bg-black z-50 opacity-80 w-1/2 translate-x-full animate-doors-close"></div>
      </div>
    </div>
  );
}
