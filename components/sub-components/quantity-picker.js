import React, { useEffect, useState } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
export default function QuantityPicker({variant, quantity, setQuantity}) {
  let [error, setError] = useState(false);
  let validateOnChange = (value) => {
    let regex = new RegExp("/^d+$/");
    if (regex.test(value)) {
      setQuantity(value);
    } else {
      setError('Enter A Number');
      setTimeout(() => {
        setError(false);
      }, 1000);
    }
  };

  let increment = (value) => {
    if(variant.quantityAvailable >= quantity + 1){
      console.log(quantity, variant.quantityAvailable)
      setQuantity(quantity+1)
    } else {
      setError('Quantity Not Available');
      setTimeout(() => {
        setError(false);
      }, 1000);
    }
    
  }
  let decrement = (value) => {
    if(quantity-1 > 0){
      setQuantity(quantity-1);
    }
  }
  return (
    <div className="inline-flex relative border-solid border-black border-2 rounded overflow-hidden">
      {error ? (
        <div className="error absolute bg-red-500 h-full w-full flex text-center items-center text-white justify-center text-xs">
          {/* <RiErrorWarningLine size="35px" color="white" /> */}
          {error}
        </div>
      ) : (
        false
      )}
      <div onClick={decrement} className="cursor-pointer p-4 border-r-2 border-solid border-black anim-scale-child">
        <div>-</div>
      </div>
      <input
        className="p-4 border-none hover:border-r-0 w-12 text-center focus:outline-none"
        onChange={(e) => validateOnChange(e.target.value)}
        value={quantity}
      />
      <div onClick={increment} className="cursor-pointer p-4 border-l-2  anim-scale-child border-solid border-black">
        <div>+</div>
      </div>
    </div>
  );
}
