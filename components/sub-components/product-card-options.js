import React from "react";
import { useDispatch } from "react-redux";
export default function ProductCardOptions({ setOption, options, selected, product }) {
  console.log('wtf', selected)
  // let selected = useSelector((state) => state.products.pdp.selectedVariant);
  let optionNames = Object.keys(options);
  let optionsElements = () => {
    return optionNames.map((name) => {
      if (name === "color") {
        return (
          <div key={name} className="flex-1  mb-3">
            <p className="mb-1">Color</p>
            <div className="w-full flex-none text-sm flex items-center text-gray-600">
              <ul className="flex flex-row justify-center items-center space-x-2">
                {options[name].map((option) => {
                  let isSelected = selected.selectedProduct !== null && product.id === selected.selectedProduct.id;
                  let selectedOptions = isSelected ? selected.selectedVariant.selectedOptions : [];
                  let seletedStyles = 'border-gray-900';
                  selectedOptions.forEach(selectedOption => {
                    if(selectedOption.value.toLowerCase()===option.toLowerCase()){
                      seletedStyles = `border-3 border-white`
                    }
                  })
                  // console.log(seletedStyles)
                  // let hoverColor =
                  //   option === "white" ? "hover:border-white" : option === "black" ? "hover:border-zinc-700" : `hover:border-${option}-500`;
                  let bgColor = 
                    option === "white" ? "bg-white" : option === "black" ? "bg-zinc-700" : `bg-${option}-500`;
                  return (
                    <li onClick={() => setOption({ name, value: option })} key={option} title={option} className="cursor-pointer">
                      <span className={`block p-1 border-2 ${seletedStyles} hover:border-white active:border-white rounded-full transition ease-out`}>
                        <div className={`block w-4 h-4 ${bgColor} rounded-full`}></div>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );
      } else {
        return (
          <div key={name} className="flex-1 inline-flex flex-wrap items-center mb-3">
            {options[name].map((option) => {
              return (
                <div onClick={() => setOption({ name, value: option })} key={option} className="cursor-pointer ml-1 text-gray-300">
                  <span className="hover:text-red-500 p-1 py-0">{option}</span>
                </div>
              );
            })}
          </div>
        );
      }
    });
  };

  return <div className="flex flex-col  py-4  text-sm text-gray-600">{optionsElements()}</div>;
}
