import React from "react";
import { useSelector, useDispatch } from "react-redux";
export default function PdpProductOptions({ options }) {
  let selected = useSelector((state) => state.products.pdp.selectedVariant);
  let optionNames = Object.keys(options);
  return optionNames.map((name) => {
    return (
      <div key={name}>
        <div className="mt-6">{name.toUpperCase()}</div>
        {options[name].map((option) => {
          return (
            <button
              key={option}
              className={`${
                name === "color"
                  ? `text-${option} bg-${option}`
                  : ""
              }  ml-4 mt-4 h-8 w-8 rounded transition-colors border-solid border-theme-blue border-2 hover:border-red-500`}
            >
              {name !== "color" ? option : ""}
            </button>
          );
        })}
      </div>
    );
  });
}
