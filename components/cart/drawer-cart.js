import React, { createRef, useEffect } from "react";
import { connect } from "react-redux";
import { formatter } from "../../util/toUSD";
import { RiCloseFill } from "react-icons/ri";
import { GoTrashcan } from "react-icons/go";

function DrawerCart({ app, cart, hideCartModal }) {
  let visible = app.cartVisible;
  let subtotal =
    cart.items.length > 0
      ? cart.items.reduce((prev, curr) => {
          return {
            priceV2: {
              amount: Number(prev.priceV2.amount) + Number(curr.priceV2.amount),
            },
          };
        })
      : { priceV2: { amount: 0 } };
  let totalInUsd = formatter.format(subtotal.priceV2.amount);
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
              <GoTrashcan className="cursor-pointer my-icon-style" size="20px" />
            </div>
          </div>
        );
      });
    }
  };

  return (
    <div className={`fixed animate-opacity top-0 opacity-0 w-full h-screen bg-black-rgba-40 z-40 flex justify-end`}>
      <div className="max-w-md w-screen animate-tx-to-left translate-x-full flex flex-col justify-between bg-white h-full">
        <div>
          <div className="flex p-5 w-full justify-between">
            <div className="">Shopping Cart</div>
            <div className="">
              <RiCloseFill onClick={hideCartModal} className="cursor-pointer my-icon-style" size="25px" color="black" />
            </div>
          </div>
          <div className="px-5 overflow-y-scroll">
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
            <a href={cart.checkout_url}>
              <button type="button" className="hover:bg-yellow-500 transition-colors relative bg-black text-white w-full rounded mt-5 p-3">
                Check Out
              </button>
            </a>
  
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
    app: state.app,
    cart: state.cart,
  };
}
export default connect(stateToProps, null)(DrawerCart);
