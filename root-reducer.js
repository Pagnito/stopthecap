
import { combineReducers } from "redux";
import userReducer from './reducers/user-reducer';
import productReducer from './reducers/product-reducer';
import appReducer from "./reducers/app-reducer";
import cartReducer from "./reducers/cart-reducer";

export default combineReducers({
    app: appReducer,
    cart: cartReducer,
    auth: userReducer,
    products: productReducer
});