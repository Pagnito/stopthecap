import React, { useEffect } from "react";

export default function PdpProductOptions({ options, selectedVariant, selectVariant, primaryOptionIndex }) {
  let selectedOptions = selectedVariant.selectedOptions;
  let governingOptionName = selectedOptions[primaryOptionIndex].name.toLowerCase();


  let governingOptions = () => {
    let governingOptions = Object.keys(options);
    let isColorOrSize = governingOptionName.toLowerCase() === "size" || governingOptionName === "color";
    return (
      <div>
        <div className="mt-6">{governingOptionName.toUpperCase()}</div>
        <div className="flex flex-wrap">
          {governingOptions.map((option) => {
            option = option.toLowerCase();
            return (
              <button
                key={option}
                onClick={() => selectVariant({ name: governingOptionName.toLowerCase(), value: option.toLowerCase() })}
                className={`${isColorOrSize ? `text-${option} bg-${option}` : "p-2"}  ml-4 ${
                  isColorOrSize ? "h-8 w-8" : ""
                } mt-4 rounded transition-colors border-solid border-theme-blue border-2 hover:border-red-500`}
              >
                {governingOptionName.toLowerCase() !== "color" ? option : ""}
              </button>
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
      return (
        <div className="" key={name}>
          <div className="mt-6">{name}</div>
          <div className="flex flex-wrap">
            {options[selectedOptions[primaryOptionIndex].value.toLowerCase()][name].map((option) => {
              return (
                <button
                  key={option}
                  className={`${name === "color" ? `text-${option} bg-${option}` : ""}  ml-4 mt-4 ${
                    name === "color" || name === "size" ? "h-8 w-8" : ""
                  } rounded transition-colors border-solid border-theme-blue border-2 hover:border-red-500`}
                >
                  {name !== "color" ? option : ""}
                </button>
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
    </div>
  );
}
