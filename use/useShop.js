import { useSelector, useDispatch } from 'react-redux';

function useShop() {
  let unfilteredShop = useSelector(({products}) => products.unfilteredShop);
  let filterResults = () => {

  }  
  return {

  }
}

export default useShop;