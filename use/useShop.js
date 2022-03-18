import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateShopCatalog } from "../actions/products/products-actions";

function useShop() {
  let unfilteredShop = useSelector(({ products }) => products.unfilteredShop);
  let filters = useSelector(({ products }) => products.shopFilters);
  let dispatch = useDispatch();
  let filterShop = () => {
   let filtered =  unfilteredShop.filter((item) => {
      let itemPasses = true;
      let categoriesItemIsPartOf = item.node.collections.edges.map((edge) => edge.node.title);
      let price = Number(item.node.variants.edges[0].node.priceV2.amount);
      if (filters.categories.length > 0) {
        let pass = categoriesItemIsPartOf.some(category => filters.categories.includes(category));
        itemPasses = pass;
      } else {
        itemPasses = true
      }
      if (filters.price.highestPrice !== 0 || filters.price.lowestPrice !== 0) {
        if (filters.price.lowestPrice >= price && filters.price.highestPrice <= price) {
          console.log('here')
          itemPasses = false;
        }
      }
      if (itemPasses) {
        return item;
      }
    });
    console.log(filtered)
    dispatch(updateShopCatalog(filtered));
  };

  return {
    filterShop,
  };
}

export default useShop;
