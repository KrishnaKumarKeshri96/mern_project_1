import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { cartReducer } from "./reducers/cartReducer";
import {
  productsReducer,
  productDetailsReducer,
} from "./reducers/productReducer.js";
import {
  profileReducer,
  userReducer,
  forgotPasswordReducer,
} from "./reducers/userReducer";

import {
  newOrderReducer,
  myOrdersReducer,
  orderDetailsReducer,
} from "./reducers/orderReducer";

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const reducer = combineReducers({
  products: productsReducer,
  productDetail: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
