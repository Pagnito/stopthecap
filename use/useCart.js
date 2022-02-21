export default function useCart(props) {

  let getCheckoutFromLocalStorage = () => {
    let checkout = JSON.parse(localStorage.getItem('checkout'));
    return checkout;
  }
  return {
    getCheckoutFromLocalStorage
  }
}