import React, { createRef, useEffect } from "react";
import { connect } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

function DrawerCart(props) {
  let visible = props.app.cartVisible;



  return (
    <div onClick={props.hideCartModal} className={`fixed animate-opacity top-0 opacity-0 w-full h-screen bg-black-rgba-40 z-40 flex justify-end`}>
      <div className="px-10 pt-5 animate-tx-to-left translate-x-full bg-white h-full">
        <div className="">Shopping Cart</div>
        <div className=""></div>

      </div>
    </div>
  );
}
function stateToProps(state) {
  return {
    app: state.app,
  };
}
export default connect(stateToProps, null)(DrawerCart);
