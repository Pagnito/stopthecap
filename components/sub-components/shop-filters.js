import React, { useEffect, useState } from "react";
import { BiSliderAlt } from "react-icons/bi";
import { RiArrowDropRightLine, RiArrowDropDownLine } from "react-icons/ri";
import Switch from "./switch";
import ReactCollapsible from "react-collapsible";
import { useSelector } from "react-redux";

let PriceFilters = () => {
  let [minPrice, setMinPrice] = useState("$ ");
  let [maxPrice, setMaxPrice] = useState("$ ");

  return (
    <div className="border-none">
      <div className="flex w-full my-2 pr-3">
        <input
          className="p-2 text-xs mr-2 border-2 rounded border-box min-w-0"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input className="p-2 text-xs border-2 rounded border-box min-w-0" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
      </div>
    </div>
  );
};

let CategoryFilters = () => {
  let collections = useSelector(({ products }) => products.collections);
  let categories = collections.map((collection) => collection.node.title);
  return (
    <div className="border-none text-xs pr-3 pl-1">
      {categories.map((category) => {
        return (
          <div className="mt-4 flex items-center" key={category}>
            <input className="text-red-500 bg-red-500" type="checkbox" />
            <div className="ml-2">{category}</div>
          </div>
        );
      })}
    </div>
  );
};

export default function ShopFilters(props) {
  let filters = ["Price", "Color", "Category"];
  let [onSale, showOnSale] = useState(true);
  let [all, showAll] = useState(true);


  let trigger = (word) => {
    return (
      <div className="flex text-sm w-full justify-between items-center p-0 border-none">
        <div>{word}</div>
        <RiArrowDropDownLine size="30px" />
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="flex items-center">
        <BiSliderAlt size="20px" />
        <div className="ml-1">Filters</div>
        <RiArrowDropRightLine size="31px" className="ml-2 cursor-pointer" />
      </div>
      {/* <div className="text-xs mt-4 flex items-center justify-between pr-1">
        <div>Show All</div>
        <Switch active={all} setActive={showAll} />
      </div> */}
      <div className="text-xs mt-6 flex items-center justify-between pr-1">
        <div>On Sale</div>
        <Switch active={onSale} setActive={showOnSale}/>
      </div>
      <div className="mt-4">
        {filters.map((filter) => (
          <ReactCollapsible
            open={filter === "price" ? true : false}
            easing="ease-in-out"
            key={filter}
            transitionTime={150}
            className="p-0 border-b-0"
            classParentString="shop-filters-collapsible"
            trigger={trigger(filter)}
          >
            {filter === "Price" ? <PriceFilters /> : filter === "Category" ? <CategoryFilters /> : ""}
          </ReactCollapsible>
        ))}
      </div>
    </div>
  );
}
