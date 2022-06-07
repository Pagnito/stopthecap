import React from "react";
import ProductCard from "../../sub-components/product-card";
import { connect } from "react-redux";
import { app } from "../../../app.config";

const recommendations = (props) => {
  let products =
    props.products !== null && props.products.recommendations ? props.products.recommendations.slice(0,4) : []
   

  return (
    <div className="bg-white -mt-1">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold text-center tracking-tight text-gray-900">
          You may also like
        </h2>
        {products.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-y-2 gap-x-20 xxs:grid-cols-2 xl:grid-cols-4 2xl:gap-x-8">
            {products.map((product) => (
              <ProductCard dimensions="xxs:w-36 xs:w-48 sm:w-60 md:w-72 lg:w-11/12 xl:w-72" key={product.id} data={product} />
            ))}
          </div>
        ) : (
          <div className="w-full flex justify-center mt-5">
            Products Failed To Load.
          </div>
        )}
      </div>
    </div>
  );
};

function stateToProps(state) {
  return {
    products: state.products,
  };
}
export default connect(stateToProps, null)(recommendations);
