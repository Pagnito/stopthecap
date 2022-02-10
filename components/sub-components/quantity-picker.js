import React from "react";

export default function QuantityPicker(props) {
  let quantity = props.quantity;
  return (
    <div className="inline-flex border-solid border-black border-2 rounded">
      <div className="cursor-pointer p-4 border-r-2 border-solid border-black">-</div>
      <div className="p-4">{quantity}</div>
      <div className="cursor-pointer p-4 border-l-2 border-solid border-black">+</div>
    </div>
  );
}
