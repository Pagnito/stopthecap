import React, { useState } from "react";
import QuantityPicker from "./quantity-picker";

export default function PdpProductOptions({ product, options, selectedVariant, selectVariant, primaryOptionIndex, addToCart }) {
  let selectedOptions = selectedVariant.selectedOptions;
  let governingOptionName = selectedOptions[primaryOptionIndex].name.toLowerCase();
  let [quantity, setQuantity] = useState(1);

  let addToCartWithQty = () => {
    selectedVariant.variantQuantity = quantity;
    selectedVariant.name = product.title;
    addToCart(selectedVariant);
  }
  let governingOptions = () => {
    let governingOptions = Object.keys(options);
    let isColorOrSize = governingOptionName.toLowerCase() === "size" || governingOptionName === "color";
    let selectedGoverningOption = selectedOptions[primaryOptionIndex].value.toLowerCase();
    return (
      <div>
        <div className="mt-6">{governingOptionName.toUpperCase()}</div>
        <div className="flex flex-wrap">
          {governingOptions.map((option) => {
            option = option.toLowerCase();
            return (
              <div
                className={`${isColorOrSize ? "h-10 w-10" : ""} ${
                  selectedGoverningOption === option ? "border-black" : ""
                } transition-all border-2 flex items-center justify-center md:hover:border-zinc-600 border-white mt-3 ml-3 rounded-lg`}
                key={option}
              >
                <button
                  onClick={() => selectVariant({ name: governingOptionName.toLowerCase(), value: option.toLowerCase() })}
                  className={`${isColorOrSize ? `text-${option} bg-${option}` : "p-2"}   ${
                    isColorOrSize ? "h-8 w-8 border-black" : "hover:border-black"
                  } rounded transition-all border-solid border-2 text-sm`}
                >
                  {governingOptionName.toLowerCase() !== "color" ? option : ""}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  let otherOptions = () => {
    let otherOptions = selectedOptions
      .map((option) => option.name.toLowerCase())
      .filter((option) => option.toLowerCase() !== governingOptionName.toLowerCase());
    return otherOptions.map((name) => {
      let indexOfOption = selectedOptions.findIndex((option) => option.name.toLowerCase() === name.toLowerCase());
      return (
        <div className="" key={name}>
          <div className="mt-6">{name}</div>
          <div className="flex flex-wrap">
            {options[selectedOptions[primaryOptionIndex].value.toLowerCase()][name].map((option) => {
              let selectedOption = selectedOptions[indexOfOption].value;
              return (
                <div
                  className={`${name === "size" ? "h-10 w-10 " : ""} ${
                    selectedOption.toLowerCase() === option.toLowerCase() ? "border-black" : ""
                  } transition-all border-2 flex items-center justify-center h-10 w-10 hover:border-zinc-600 border-white mt-3 ml-3 rounded-lg`}
                  key={option}
                >
                  <button
                    onClick={() => selectVariant({ name: name.toLowerCase(), value: option.toLowerCase() })}
                    key={option}
                    className={`${name === "size" ? ` bg-${option}` : ""} ${
                      name === "size" ? "h-8 w-8 border-black" : "hover:border-black"
                    } rounded transition-all border-solid border-2 text-sm`}
                  >
                    {name !== "color" ? option : ""}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      {governingOptions()}
      {otherOptions()}
      <div className="flex xxs:mt-5 lg:mt-8 xxs:flex-col lg:flex-row">
        <QuantityPicker setQuantity={setQuantity} variant={selectedVariant} quantity={quantity} />
        <button
          onClick={addToCartWithQty}
          className="rounded transition-colors hover:bg-green-500 bg-red-500 xxs:pt-5 xxs:pb-5 lg:pb-0 lg:pt-0 pl-10 pr-10 lg:ml-3 lg:mt-0 xxs:mt-5 text-white"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
