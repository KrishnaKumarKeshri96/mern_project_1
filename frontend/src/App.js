import "./App.css";
import { useEffect, useState } from "react";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import axios from "axios";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.jsx";
import ProductDetails from "./component/Product/ProductDetails.js";
import Search from "./component/Product/Search";
import Products from "./component/Product/Products.js";
import LoginSignUp from "./component/User/LoginSignUp";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/userAction";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import ForgotPassword from "./component/User/ForgotPassword.js";

import ResetPassword from "./component/User/ResetPassword.js";

import UpdatePassword from "./component/User/UpdatePassword.js";

import Cart from "./component/Cart/Cart.js";

import Shipping from "./component/Cart/Shipping.js";

import ConfirmOrder from "./component/Cart/ConfirmOrder";

import Payment from "./component/Cart/Payment";

import { Elements } from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";

import OrderSuccess from "./component/Cart/OrderSuccess";

import MyOrders from "./component/Order/MyOrders";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  return (
    <>
      <Router>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}

        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute exact path="/process/payment" component={Payment} />
          </Elements>
        )}

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/product/:id" component={ProductDetails} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/login" component={LoginSignUp} />

          <Route exact path="/cart" component={Cart} />

          <ProtectedRoute exact path="/account" component={Profile} />
          <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
          <ProtectedRoute exact path="/shipping" component={Shipping} />

          <ProtectedRoute
            exact
            path="/order/confirm"
            component={ConfirmOrder}
          />

          <ProtectedRoute exact path="/success" component={OrderSuccess} />

          <ProtectedRoute
            exact
            path="/password/update"
            component={UpdatePassword}
          />
          <Route exact path="/password/forgot" component={ForgotPassword} />

          <Route
            exact
            path="/password/reset/:token"
            component={ResetPassword}
          />

          <ProtectedRoute exact path="/orders" component={MyOrders} />
        </Switch>

        <Footer />
      </Router>
    </>
  );
}

export default App;
