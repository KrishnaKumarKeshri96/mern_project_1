import { useEffect } from "react";

import { CgMouse } from "react-icons/all";
import "./Home.css";
import ProductCard from "./ProductCard";
import Loader from "../layout/Loader/Loader";

import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const products = [];
  const loading = true;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="banner">
          <p>Welcome to Ecommerce</p>
          <h1>FIND AMAZING PRODUCTS BELOW</h1>

          <a href="#container">
            <button>
              Scroll <CgMouse />
            </button>
          </a>
          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
