import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MenuList } from "./MenuList";
import { useSelector } from "react-redux";
import "./Navbar.css";

const Navbar = () => {
  const [clicked, setClicked] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);
  const handleClick = () => {
    setClicked(!clicked);
  };
  const menuList = MenuList.map(({ url, title }, index) => {
    return (
      <li key={index}>
        {index === MenuList.length - 1 ? (
          <NavLink
            onClick={handleClick}
            exact
            to={url}
            activeClassName="active"
          >
            {isAuthenticated ? "View/Edit Profile" : title}
          </NavLink>
        ) : (
          <NavLink
            onClick={handleClick}
            exact
            to={url}
            activeClassName="active"
          >
            {title}
          </NavLink>
        )}
      </li>
    );
  });

  return (
    <nav>
      <div className="menu-icon" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={clicked ? "menu-list" : "menu-list close"}>
        <div className="logo">
          E<font>Commerce</font>
        </div>
        {menuList}
      </ul>
    </nav>
  );
};

export default Navbar;
