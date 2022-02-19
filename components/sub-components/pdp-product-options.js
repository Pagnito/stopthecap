import React from "react";
import { useDispatch } from "react-redux";
export default function PdpProductOptions({ options, selectedVariant, selectVariant }) {
  let selectedOptions = selectedVariant.selectedOptions;
  let governingOptionName = selectedOptions[0].name;
  let governingOptions = () => {
    let governingOptions = Object.keys(options);
    return (
      <div>
        <div className="mt-6">{governingOptionName.toUpperCase()}</div>
        <div className="flex flex-wrap">
          {governingOptions.map((option) => {
            return (
              <button
                key={option}
                className={`${
                  option === "color" ? `text-${option} bg-${option}` : ""
                }  ml-4 mt-4 h-8 w-8 rounded transition-colors border-solid border-theme-blue border-2 hover:border-red-500`}
              >
                {option.toLowerCase() !== "color" ? option : ""}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  let otherOptions = () => {
    let otherOptions = selectedOptions.map(option => option.name).filter(option => option.toLowerCase()!==governingOptionName.toLowerCase());
    return otherOptions.map((name) => {
      console.log(options, selectedOptions[0].value)
      console.log(name)
      return (
        <div className="" key={name}>
          <div className="mt-6">{name.toUpperCase()}</div>
          <div className="flex flex-wrap">
            {options[selectedOptions[0].value.toLowerCase()][name.toLowerCase()].map((option) => {
              return (
                <button
                  key={option}
                  className={`${
                    name.toLowerCase() === "color" ? `text-${option} bg-${option}` : ""
                  }  ml-4 mt-4 h-8 w-8 rounded transition-colors border-solid border-theme-blue border-2 hover:border-red-500`}
                >
                  {name.toLowerCase() !== "color" ? option : ""}
                </button>
              );
            })}
          </div>
        </div>
      );
    });
  }
 

  return (
  <div>
    {governingOptions()}
    {otherOptions()}
  </div>
  )
}
