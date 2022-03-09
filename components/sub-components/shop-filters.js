import React from "react";
import { BiSliderAlt } from "react-icons/bi";
import { RiArrowDropRightLine, RiArrowDropDownLine } from "react-icons/ri";
import ReactCollapsible from "react-collapsible";

export default function ShopFilters(props) {
  let filters = ["Price", "Colors", "Categories"];
  let trigger = (word) => {
    return (
      <div className="flex text-xs w-full justify-between items-center p-0 border-none">
        <div>{word}</div>
        <RiArrowDropDownLine size="30px" />
      </div>
    );
  };
  let PriceFilters = () => {
    return (
      <div className="border-none h-10">
        Hello
      </div>
    );
  };
  return (
    <div className="w-full">
      <div className="flex items-center">
        <BiSliderAlt size="20px" />
        <div className="ml-1">Filters</div>
        <RiArrowDropRightLine size="30px" />
      </div>
      <div className="text-xs mt-4">Out Of Stock</div>
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
            {filter === "Price" ? <PriceFilters  /> : ''}
          </ReactCollapsible>
        ))}
      </div>
    </div>
  );
}
