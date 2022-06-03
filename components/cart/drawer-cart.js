import React from "react";
import { connect, useDispatch } from "react-redux";
import useProduct from "../../use/useProduct";
import { RiCloseFill } from "react-icons/ri";
import { GoTrashcan } from "react-icons/go";
import {removeCartItemAction} from '../../actions/cart/cart-actions';
import useCart from "../../use/useCart";
import router from 'next/router';
import * as fbp from '../../util/fbpixel';

function DrawerCart({ cart, hideCartModal }) {
  let {formatter} = useProduct();
  let {subtotal} = useCart();
  let dispatch = useDispatch();
  let totalInUsd = formatter.format(subtotal.priceV2.amount);

  const pushToCheckout = () => {
    fbp.event('init checkout', {totalInUsd});
    router.push(cart.checkout_url);
  }
  let cartItems = () => {
    if (cart.items.length === 0) {
      return <div className="w-full p-10 mt-10 text-zinc-500 text-sm text-center">Your Cart Is Empty.</div>;
    } else {
      return cart.items.map((item, ind) => {
        return (
          <div key={item.id} className={`${ind > 0 ? "mt-5" : ""} flex justify-between`}>
            <div className="flex">
              <img src={item.image.originalSrc} className="w-20 h-20" />
              <div className="pl-5 flex flex-col justify-between">
                <p className="">{item.name}</p>
                <p className=" text-xs text-zinc-500">{item.title}</p>
                <p className=" text-xs text-zinc-500">{`Qty: ${item.variantQuantity}`}</p>
              </div>
            </div>
            <div className="flex flex-col justify-between items-end">
              <p className="mt-1 text-xs text-zinc-500">{formatter.format(item.priceV2.amount)}</p>
              <GoTrashcan onClick={() => dispatch(removeCartItemAction(item, cart))} className="cursor-pointer my-icon-style" size="20px" />
            </div>
          </div>
        );
      });
    }
  };

  return (
    <div className={`fixed animate-opacity top-0 opacity-0 w-full h-screen bg-black-rgba-40 z-50 flex justify-end`}>
      <div className="max-w-md w-screen animate-tx-to-left translate-x-full flex flex-col justify-between bg-white h-full">
        <div className="overflow-y-scroll">
          <div className="flex p-5 w-full justify-between sticky top-0 bg-white">
            <div className="">Shopping Cart</div>
            <div className="">
              <RiCloseFill onClick={hideCartModal} className="cursor-pointer my-icon-style" size="35px" color="black" />
            </div>
          </div>
          <div className="px-5">
            <div className="overflow-y-auto">{cartItems()}</div>
          </div>
        </div>

        {cart.items.length > 0 ? (
          <div className="p-5 ">
            <div className="flex w-full justify-between">
              <div>Subtotal</div>
              <div>{totalInUsd}</div>
            </div>
            <p className="text-xs mt-2 text-zinc-500"> Taxes will be calculated at checkout.</p>
            {/* <a href={cart.checkout_url}> */}
              <button onClick={pushToCheckout} type="button" className="hover:bg-yellow-500 transition-colors relative bg-black text-white w-full rounded mt-5 p-3">
                Check Out
              </button>
            {/* </a> */}
  
          </div>
        ) : (
          false
        )}
      </div>
    </div>
  );
}
function stateToProps(state) {
  return {
    cart: state.cart,
  };
}
export default connect(stateToProps, null)(DrawerCart);
