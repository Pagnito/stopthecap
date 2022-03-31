import React, { useEffect, useState } from "react";
import { BiSliderAlt } from "react-icons/bi";
import { RiArrowDropRightLine, RiArrowDropDownLine } from "react-icons/ri";
import Switch from "../switch";
import ReactCollapsible from "react-collapsible";
import { useSelector, useDispatch } from "react-redux";
import PriceFilters from "./price-filters";
import CategoryFilters from "./category-filters";
import useShop from "../../../use/useShop";



export default function ShopFilters(props) {
  let filterTypes = ["Price", "Category"];
  let { filterShop, updateCategoryFilters,updateLowestPriceFilters, updateHighestPriceFilters, showOnlyOnSaleItems } = useShop();
  let filters = useSelector(({ products }) => products.shopFilters);
  let [onSale, showOnSale] = useState(filters.onSale);


  useEffect(() => {
    showOnlyOnSaleItems(onSale);
  }, [onSale]);

  useEffect(() => {
    filterShop();
  }, [filters.price, filters.categories]);

  let trigger = (word) => {
    return (
      <div className="flex text-sm w-full justify-between items-center p-0 border-none">
        <div>{word}</div>
        <RiArrowDropDownLine size="30px" />
      </div>
    );
  };

  return (
    <div className="w-full max-h-screen-minus-100px overflow-y-scroll hide-scrollbar">
      <div className="xxs:hidden lg:flex items-center">
        <BiSliderAlt size="20px" />
        <div className="ml-1">Filters</div>
        {/* <RiArrowDropRightLine size="31px" className="ml-2 cursor-pointer" /> */}
      </div>
      {/* <div className="text-xs mt-4 flex items-center justify-between pr-1">
        <div>Show All</div>
        <Switch active={all} setActive={showAll} />
      </div> */}
      <div className="text-xs mt-6 flex items-center justify-between pr-1">
        <div>On Sale</div>
        <Switch active={onSale} setActive={showOnSale} />
      </div>
      <div className="mt-4">
        {filterTypes.map((filter) => (
          <ReactCollapsible
            open={true}
            easing="ease-in-out"
            key={filter}
            transitionTime={150}
            className="p-0 border-b-0"
            classParentString="shop-filters-collapsible"
            trigger={trigger(filter)}
          >
            {filter === "Price" ? (
              <PriceFilters
                priceRange={filters.price}
                updateLowestPriceFilters={updateLowestPriceFilters}
                updateHighestPriceFilters={updateHighestPriceFilters}
              />
            ) : filter === "Category" ? (
              <CategoryFilters 
               checked={filters.categories}
               updateCategoryFilters={updateCategoryFilters} />
            ) : (
              ""
            )}
          </ReactCollapsible>
        ))}
      </div>
    </div>
  );
}
