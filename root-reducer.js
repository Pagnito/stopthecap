
import { combineReducers } from "redux";
import userReducer from './reducers/user-reducer';
import productReducer from './reducers/product-reducer';
import productsReducer from './reducers/products-reducer';
import appReducer from "./reducers/app-reducer";
import cartReducer from "./reducers/cart-reducer";
import infoReducer from "./reducers/info-reducer";

export default combineReducers({
    app: appReducer,
    cart: cartReducer,
    auth: userReducer,
    product: productReducer,
    products: productsReducer,
    info: infoReducer
});