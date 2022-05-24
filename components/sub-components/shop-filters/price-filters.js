import React, {useState} from 'react';


let PriceFilters = ({ updateHighestPriceFilters, updateLowestPriceFilters, priceRange }) => {
  let [lowestPrice, setLowestPrice] = useState(priceRange.lowestPrice);
  let [highestPrice, setHighestPrice] = useState(priceRange.highestPrice);

  let onChangeLowestPrice = (e) => {
    setLowestPrice(e.target.value);
    updateLowestPriceFilters(e.target.value);
  }
  let onChangeHighestPrice = (e) => {
    setHighestPrice(e.target.value);
    updateHighestPriceFilters(e.target.value);
  }
  return (
    <div className="border-none">
      <div className="flex w-full my-2 pr-3">
        <input
          type="number"
          min="0"
          className="p-2 text-xs mr-2 border-2 rounded border-box min-w-0"
          value={lowestPrice}
          onChange={onChangeLowestPrice}
        />
        <input
        type="number"
          min="0"
          className="p-2 text-xs border-2 rounded border-box min-w-0"
          value={highestPrice}
          onChange={onChangeHighestPrice}
        />
      </div>
    </div>
  );
};

export default PriceFilters;