import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateShopCatalog, updateShopFilters } from "../actions/products/products-actions";

function useShop() {
  let unfilteredShop = useSelector(({ products }) => products.unfilteredShop);
  let filters = useSelector(({ products }) => products.shopFilters);
  let dispatch = useDispatch();
  let filterShop = () => {
    let filtered = unfilteredShop.filter((item) => {
      let categoriesItemIsPartOf = item.node.collections.edges.map((edge) => edge.node.title);
      let price = Number(item.node.variants.edges[0].node.priceV2.amount);
      let catPass = categoriesItemIsPartOf.some((category) => filters.categories.includes(category));
      let maxCompareAtPrice = Number(item.node.compareAtPriceRange.maxVariantPrice.amount);
      return (
        (filters.categories.length > 0 ? catPass : true) &&
        (filters.price.lowestPrice !== 0 ? filters.price.lowestPrice <= price : true) &&
        (filters.price.highestPrice !== 0 ? filters.price.highestPrice >= price : true) &&
        (filters.onSale ? price < maxCompareAtPrice : true)
      );
    });
    dispatch(updateShopCatalog(filtered));
  };

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

  let showOnlyOnSaleItems = (onSale) => {
    let clone = JSON.parse(JSON.stringify(filters));
    clone.onSale = onSale;
    dispatch(updateShopFilters(clone));
  };

  return {
    filterShop,
    updateCategoryFilters,
    updateLowestPriceFilters,
    updateHighestPriceFilters,
    showOnlyOnSaleItems,
  };
}

export default useShop;
