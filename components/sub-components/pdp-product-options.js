import React from "react";
import { useSelector, useDispatch } from "react-redux";
export default function PdpProductOptions({ options }) {
  let selected = useSelector((state) => state.products.productPage.selectedVariant);
  let optionNames = Object.keys(options);
  return optionNames.map((name) => {
    return (
      <div className="" key={name}>
        <div className="mt-6">{name.toUpperCase()}</div>
        <div className="flex flex-wrap">
          {options[name].map((option) => {
            return (
              <button
                key={option}
                className={`${
                  name === "color" ? `text-${option} bg-${option}` : ""
                }  ml-4 mt-4 h-8 w-8 rounded transition-colors border-solid border-theme-blue border-2 hover:border-red-500`}
              >
                {name !== "color" ? option : ""}
              </button>
            );
          })}
        </div>
      </div>
    );
  });
}
