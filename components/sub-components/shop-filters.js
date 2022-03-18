import React, { useEffect, useState } from "react";
import { BiSliderAlt } from "react-icons/bi";
import { RiArrowDropRightLine, RiArrowDropDownLine } from "react-icons/ri";
import Switch from "./switch";
import ReactCollapsible from "react-collapsible";
import { useSelector, useDispatch } from "react-redux";
import useShop from "../../use/useShop";
import { updateShopFilters } from "../../actions/products/products-actions";

let PriceFilters = ({ updateHighestPriceFilters, updateLowestPriceFilters }) => {
  let [lowestPrice, setLowestPrice] = useState();
  let [highestPrice, setHighestPrice] = useState();

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
          className="p-2 text-xs mr-2 border-2 rounded border-box min-w-0"
          value={lowestPrice}
          onChange={onChangeLowestPrice}
        />
        <input
          type="number"
          className="p-2 text-xs border-2 rounded border-box min-w-0"
          value={highestPrice}
          onChange={onChangeHighestPrice}
        />
      </div>
    </div>
  );
};

let CategoryFilters = ({ updateCategoryFilters }) => {
  let collections = useSelector(({ products }) => products.collections);
  let categories = collections.map((collection) => collection.node.title);
  return (
    <div className="border-none text-xs pr-3 pl-1">
      {categories.map((category) => {
        return (
          <div className="mt-4 flex items-center" key={category}>
            <input onClick={() => updateCategoryFilters(category)} className="text-red-500 bg-red-500" type="checkbox" />
            <div className="ml-2">{category}</div>
          </div>
        );
      })}
    </div>
  );
};

export default function ShopFilters(props) {
  let filterTypes = ["Price", "Category"];
  let dispatch = useDispatch();
  let [onSale, showOnSale] = useState(false);
  let { filterShop } = useShop();
  let filters = useSelector(({ products }) => products.shopFilters);


  let updateCategoryFilters = (category) => {
    let indexOfCategory = filters.categories.indexOf(category);
    if (indexOfCategory > -1) {
      filters.categories.splice(indexOfCategory, 1);
    } else {
      filters.categories = [...filters.categories, category];
    }
    let clone = JSON.parse(JSON.stringify(filters));
    dispatch(updateShopFilters(clone));
  };

  let updateLowestPriceFilters = (price) => {
    let clone = JSON.parse(JSON.stringify(filters));
    clone.price.lowestPrice = Number(price);
    dispatch(updateShopFilters(clone));
  };

  let updateHighestPriceFilters = (price) => {
    let clone = JSON.parse(JSON.stringify(filters));
    clone.price.highestPrice = Number(price);
    dispatch(updateShopFilters(clone));
  };

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
                updateLowestPriceFilters={updateLowestPriceFilters}
                updateHighestPriceFilters={updateHighestPriceFilters}
              />
            ) : filter === "Category" ? (
              <CategoryFilters updateCategoryFilters={updateCategoryFilters} />
            ) : (
              ""
            )}
          </ReactCollapsible>
        ))}
      </div>
    </div>
  );
}
