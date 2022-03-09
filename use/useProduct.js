import { useDispatch, useSelector} from "react-redux";
import {updateWishlist} from '../actions/products/products-actions';

export default function UseProduct(props) {
  let dispatch = useDispatch();
  let wishlistSearchSource = useSelector(({products}) => products.wishlistSearchSource);
  
  let isItOnWishlist = (id) => {
    let item = wishlistSearchSource.find(item => item.id === id);
    return item ? true : false;
  } 
  let searchWishlist = (keyword) => {
    let searched = wishlistSearchSource.filter((product) => {
      return product.title.indexOf(keyword) > -1 || product.handle.indexOf(keyword) > -1 || product.productType.indexOf(keyword) > -1 ||
      product.tags.indexOf(keyword) > -1;
    });
    dispatch(updateWishlist(searched));
  };

  let determinePrimaryOptionIndex = (options) => {
    let colorIndex = options.findIndex((option) => option.name.toLowerCase() === "color");
    return colorIndex > -1 ? colorIndex : 0;
  };

  let filterVariantsByOption_ColorPrimary = (variants) => {
    let variantsByColor = variants.filter((variant, ind, arr) => {
      let colorOptionIndex = variant.node.selectedOptions.findIndex((option) => option.name.toLowerCase() === "color");
      if (colorOptionIndex > -1) {
        let indexOfOption = arr.findIndex(
          (vari) =>
            vari.node.selectedOptions[colorOptionIndex].value.toLowerCase() ===
            variant.node.selectedOptions[colorOptionIndex].value.toLowerCase()
        );
        return ind === indexOfOption;
      } else {
        let indexOfOption = arr.findIndex((vari) => vari.node.selectedOptions[0].value === variant.node.selectedOptions[0].value);
        return ind === indexOfOption;
      }
    });
    return variantsByColor;
  };

  let organizeOptions = (variants, optionIndex) => {
    let organized = {};
    variants.forEach((variant1) => {
      let rootKeyToOrganizeBy = variant1.node.selectedOptions[optionIndex].value.toLowerCase();
      organized[rootKeyToOrganizeBy] = {};
      variants.forEach((variant2, ind) => {
        let optionToTest = variant2.node.selectedOptions[optionIndex].value.toLowerCase();
        if (rootKeyToOrganizeBy === optionToTest) {
          variant2.node.selectedOptions.forEach((option) => {
            if (organized[rootKeyToOrganizeBy][option.name.toLowerCase()]) {
              if (organized[rootKeyToOrganizeBy][option.name.toLowerCase()].indexOf(option.value.toLowerCase()) < 0) {
                organized[rootKeyToOrganizeBy][option.name.toLowerCase()].push(option.value.toLowerCase());
              }
            } else {
              organized[rootKeyToOrganizeBy][option.name.toLowerCase()] = [option.value.toLowerCase()];
            }
          });
        }
      });
    });
    return organized;
  };
  let findIndexOfOption = (options) => {
    let indexes = {};
    options.forEach((obj, ind) => {
      indexes[obj.name.toLowerCase()] = ind;
    });
    return indexes;
  };
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
  return {
    formatter,
    searchWishlist,
    findIndexOfOption,
    organizeOptions,
    determinePrimaryOptionIndex,
    filterVariantsByOption_ColorPrimary,
    isItOnWishlist
  };
}
