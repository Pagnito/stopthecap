
import { combineReducers } from "redux";
import userReducer from './reducers/user-reducer';
import productReducer from './reducers/product-reducer';
import appReducer from "./reducers/app-reducer";
export default combineReducers({
    app: appReducer,
    auth: userReducer,
    products: productReducer
});