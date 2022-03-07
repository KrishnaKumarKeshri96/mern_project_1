import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productsReducer,
  productDetailsReducer,
} from "./reducers/productReducer.js";
import { profileReducer, userReducer } from "./reducers/userReducer";
let initialState = {};

const reducer = combineReducers({
  products: productsReducer,
  productDetail: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
