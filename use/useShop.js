import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateShopCatalog } from "../actions/products/products-actions";

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
      return (filters.categories.length > 0
        ? catPass
        : true) && (filters.price.lowestPrice !== 0
        ? filters.price.lowestPrice <= price
        : true) && (filters.price.highestPrice !==0
        ? filters.price.highestPrice >= price
        : true) && (filters.onSale  ? (price < maxCompareAtPrice ) : true);
    });
    dispatch(updateShopCatalog(filtered));
  };

  return {
    filterShop,
  };
}

export default useShop;
