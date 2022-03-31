import { useSelector, useDispatch } from "react-redux";
import {updateWishlist} from '../actions/cart/cart-actions';

export default function useCart(props) {
  let dispatch = useDispatch();
  let cart = useSelector(({cart}) => cart);
  let wishlistSearchSource = useSelector(({cart}) => cart.wishlistSearchSource) || [];
  
  let isItOnWishlist = (id) => {
    let item = wishlistSearchSource.find(item => item.id === id);
    return item ? true : false;
  } 
  let searchWishlist = (keyword) => {
    let keywords = keyword.toLowerCase().split(' ');
    let searched = wishlistSearchSource.filter((product) => {
      let title = product.title.replace('|','').toLowerCase();
      let match = keywords.find(word => {
        return title.indexOf(word) > -1 || product.productType.toLowerCase().indexOf(word) > -1 ||
        product.tags.indexOf(word) > -1;
      })
      return match
    });
    dispatch(updateWishlist(searched));
  };
  let subtotal = cart.items.length > 0
    ? cart.items.reduce((prev, curr) => {
        return {
          priceV2: {
            amount: Number(prev.priceV2.amount) + Number(curr.priceV2.amount),
          },
        };
      })
    : { priceV2: { amount: 0 } };
  
  return {
    subtotal,
    isItOnWishlist,
    searchWishlist
  }
}