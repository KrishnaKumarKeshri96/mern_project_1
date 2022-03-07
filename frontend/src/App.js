import "./App.css";
import { useEffect } from "react";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";
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

import UpdatePassword from "./component/User/UpdatePassword.js";
function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
  }, []);
  return (
    <>
      <Router>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/product/:id" component={ProductDetails} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/login" component={LoginSignUp} />

          <ProtectedRoute exact path="/account" component={Profile} />
          <ProtectedRoute exact path="/me/update" component={UpdateProfile} />

          <ProtectedRoute
            exact
            path="/password/update"
            component={UpdatePassword}
          />
          <Route exact path="/password/forgot" component={ForgotPassword} />
        </Switch>

        <Footer />
      </Router>
    </>
  );
}

export default App;
