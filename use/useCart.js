import { useSelector } from "react-redux";
export default function useCart(props) {
  let cart = useSelector(({cart}) => cart)

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
    subtotal
  }
}