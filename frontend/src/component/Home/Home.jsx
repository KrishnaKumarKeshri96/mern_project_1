import { CgMouse } from "react-icons/all";
import "./Home.css";
import ProductCard from "./ProductCard"



const Home = () => {

  const products = []
  return (
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
  );
};

export default Home;
