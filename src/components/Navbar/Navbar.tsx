import RestaurantIcon from "@mui/icons-material/Restaurant";
import "./Navbar.css";
import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Navbar() {
  const [clicked, setClicked] = useState(false);
  const { openCart, cartQuantity } = useShoppingCart();
  const location = useLocation();

  function handleClick() {
    setClicked(!clicked);
  }

  function handleLogout() {
    localStorage.clear();
    window.location.reload();
  }

  const menuItems = [
    {
      title: "Log In",
      url: "/",
      cName: "nav-links-mobile",
    },
  ];

  const loggedInMenuItems = [
    {
      title: "Home",
      url: "/dashboard",
      cName: "nav-links",
    },
    {
      title: "Browse Menu",
      url: "/browseWithCart",
      cName: "nav-links",
    },
    {
      title: "Leave A Review",
      url: "/review",
      cName: "nav-links",
    },

    {
      title: "Log Out",
      url: "/",
      cName: "nav-links-mobile",
    },
  ];

  return (
    <nav className="navbarItems">
      <h1 className="navbar-logo">
        ARMS <RestaurantIcon />{" "}
      </h1>
      <div className="menu-icon" onClick={handleClick}>
        {clicked ? (
          <CloseIcon style={{ color: "white" }} />
        ) : (
          <MenuIcon style={{ color: "white" }}>
            <CloseIcon />
          </MenuIcon>
        )}
      </div>
      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {localStorage.getItem("currentUser") == null
          ? menuItems.map((item, index) => (
              <li key={index}>
                <NavLink className={item.cName} to={item.url}>
                  {item.title}
                </NavLink>
              </li>
            ))
          : loggedInMenuItems.map((item, index) => (
              <li key={index}>
                <NavLink className={item.cName} to={item.url}>
                  {item.title}
                </NavLink>
              </li>
            ))}
        {cartQuantity > 0 && (
          <button onClick={openCart} className="nav-links-mobile">
            <ShoppingCartIcon>
              <div
                style={{
                  color: "white",
                  width: "4.5rem",
                  height: "1.5rem",
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  transform: "translate(25%, 25%)",
                }}
              >
                {cartQuantity}
              </div>
            </ShoppingCartIcon>
          </button>
        )}
      </ul>

      {cartQuantity > 0 && (
        <div className="nav-button">
          <Button
            onClick={openCart}
            style={{
              width: "3rem",
              height: "3rem",
              position: "relative",
              marginRight: "6em",
              marginLeft: "-3em",
              color: "black",
              backgroundColor: "#ffba08",
            }}
            className="nav-links-mobile"
          >
            <ShoppingCartIcon>
              <div
                style={{
                  color: "white",
                  width: "4.5rem",
                  height: "1.5rem",
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  transform: "translate(25%, 25%)",
                }}
              >
                {cartQuantity}
              </div>
            </ShoppingCartIcon>
          </Button>
        </div>
      )}

      {localStorage.getItem("currentUser") != null ? (
        <Link to="/">
          <button
            onClick={handleLogout}
            className="nav-button btn btn--primary "
          >
            Log Out
          </button>
        </Link>
      ) : (
        <Link to="/">
          <button className="nav-button btn btn--primary ">Log In</button>
        </Link>
      )}
    </nav>
  );
}

export default Navbar;
