import React, { useState, useEffect, useRef } from "react";
import { FaBasketShopping, FaMinus, FaPlus } from "react-icons/fa6";
import { RiMenu3Fill } from "react-icons/ri";
import classes from "./Navbar.module.css";
import ModalCart from "../cart/ModalCart";
import ModalMenu from "../menu/ModalMenu";

const Navbar = ({
  products,
  view,
  setView,
  activeView,
  setActiveView,
  cart,
  setCart,
  removeProductFromCart,
  addProductToCart,
  groupedCart,
  calculateTotalPrice,
  calculateTotalCartPrice,
  shippingCost,
  handleShippingCostText,
  calculateTotalPriceWithShipping,
}) => {
  const [modalOpenCart, setModalOpenCart] = useState(false);
  const [modalOpenMenu, setModalOpenMenu] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  //handles the search
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      setSearchResults([]);

      const results = products.filter((product) =>
        product.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, products]);

  const handleUserInput = (event) => {
    setSearchQuery(event.target.value);
  };

  //handel's the visibility of the search results dropdown and the listeners for it. Starts here and goes down to handleInputBlur.
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        !modalOpenCart &&
        !modalOpenMenu &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setIsDropdownVisible(false);
      }
    };

    if (!modalOpenCart && !modalOpenMenu) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [modalOpenCart, modalOpenMenu]);

  useEffect(() => {
    setIsDropdownVisible(searchQuery.trim().length >= 2);
  }, [searchQuery]);

  const handleInputFocus = () => {
    setIsInputFocused(true);
    if (searchQuery.trim().length >= 2) {
      setIsDropdownVisible(true);
    }
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
    if (searchQuery.trim().length < 2 || searchResults.length === 0) {
      setIsDropdownVisible(false);
    }
  };

  const handleKeyDown = (event, viewName) => {
    if (event.key === "Enter") {
      setView(viewName);
      setActiveView(viewName);
    }
  };

  const handleKeyDownCart = (event) => {
    if (event.key === "Enter") {
      setModalOpenCart(!modalOpenCart);
    }
  };

  const handleFocusOutOfDropdown = (event) => {
    if (!dropdownRef.current.contains(event.relatedTarget)) {
      setIsDropdownVisible(false);
    }
  };

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarTop}>
        <h1 className={classes.bigHeading}>The Wacky Coffee Shop</h1>
        <h1 className={classes.smallHeading}>T.W.C.S</h1>
        <hr className={classes.hrSmallScreen} />
        {view !== "checkout" && view !== "confirmation" ? (
          <>
            <div className={classes.searchContainer}>
              <input
                type="text"
                className={`${isInputFocused ? "" : classes.unfocused}`}
                ref={inputRef}
                value={searchQuery}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChange={handleUserInput}
                placeholder="Sök efter produkter"
                aria-label="Sök efter produkter"
              />
              {isDropdownVisible && (
                <div className={classes.searchDropdown} ref={dropdownRef}>
                  {searchResults.length > 0
                    ? searchResults.map((result, index) => (
                        <div key={result.id} className={classes.card}>
                          {result.name}
                          <div className={classes.buttonContainer}>
                            <button
                              onClick={() => removeProductFromCart(result)}
                              aria-label="Ta bort produkt"
                            >
                              <FaMinus size={12} />
                            </button>
                            <button
                              onClick={() => addProductToCart(result)}
                              aria-label="Lägg till produkt"
                              onBlur={
                                index === searchResults.length - 1
                                  ? handleFocusOutOfDropdown
                                  : null
                              }
                            >
                              <FaPlus size={12} />
                            </button>
                          </div>
                        </div>
                      ))
                    : searchQuery.trim().length >= 2 && (
                        <div className={classes.card}>
                          <p>Inga träffar</p>
                        </div>
                      )}
                </div>
              )}
            </div>
            <div className={classes.navbarRightSide}>
              <div className={classes.shoppingCartContainer}>
                <FaBasketShopping
                  tabIndex={0}
                  size={35}
                  className={classes.cartIcon}
                  onClick={() => setModalOpenCart(true)}
                  onKeyDown={(event) => handleKeyDownCart(event)}
                  aria-label="Kundvagns ikon"
                />
                {modalOpenCart && (
                  <ModalCart
                    setView={setView}
                    setModalOpenCart={setModalOpenCart}
                    cart={cart}
                    setCart={setCart}
                    removeProductFromCart={removeProductFromCart}
                    addProductToCart={addProductToCart}
                    groupedCart={groupedCart}
                    calculateTotalPrice={calculateTotalPrice}
                    shippingCost={shippingCost}
                    handleShippingCostText={handleShippingCostText}
                    calculateTotalPriceWithShipping={calculateTotalPriceWithShipping}
                  />
                )}
                <div className={classes.itemsInCart}>
                  <p>{cart.length}</p>
                </div>
              </div>
              <div className={classes.totalPrice}>
                {cart.length !== 0 ? (
                  <>
                    <p>Varukorg</p>
                    <p>{calculateTotalCartPrice()} kr</p>
                  </>
                ) : null}
              </div>
              <RiMenu3Fill
                size={35}
                className={classes.menuIcon}
                onClick={() => setModalOpenMenu(true)}
              />
              {modalOpenMenu && (
                <ModalMenu
                  setModalOpenMenu={setModalOpenMenu}
                  setView={setView}
                />
              )}
            </div>
          </>
        ) : null}
      </div>
      <hr className={classes.hrBigScreen} />
      <div className={classes.navbarBottom} role="navigation">
        {view !== "checkout" && view !== "confirmation" ? (
          <ul className={classes.bigUl} role="menu">
            <li
              tabIndex={0}
              role="menuitem"
              className={activeView === "products" ? classes.active : ""}
              onClick={() => {
                setView("products");
                setActiveView("products");
              }}
              onKeyDown={(e) => handleKeyDown(e, "products")}
            >
              Hem
            </li>
            <li
              tabIndex={0}
              role="menuitem"
              className={activeView === "lightRoast" ? classes.active : ""}
              onClick={() => {
                setView("lightRoast");
                setActiveView("lightRoast");
              }}
              onKeyDown={(e) => handleKeyDown(e, "lightRoast")}
            >
              Ljusrost
            </li>
            <li
              tabIndex={0}
              role="menuitem"
              className={activeView === "mediumRoast" ? classes.active : ""}
              onClick={() => {
                setView("mediumRoast");
                setActiveView("mediumRoast");
              }}
              onKeyDown={(e) => handleKeyDown(e, "mediumRoast")}
            >
              Mellanrost
            </li>
            <li
              tabIndex={0}
              role="menuitem"
              className={activeView === "darkRoast" ? classes.active : ""}
              onClick={() => {
                setView("darkRoast");
                setActiveView("darkRoast");
              }}
              onKeyDown={(e) => handleKeyDown(e, "darkRoast")}
            >
              Mörkrost
            </li>
            <li
              tabIndex={0}
              role="menuitem"
              className={activeView === "extraDarkRoast" ? classes.active : ""}
              onClick={() => {
                setView("extraDarkRoast");
                setActiveView("extraDarkRoast");
              }}
              onKeyDown={(e) => handleKeyDown(e, "extraDarkRoast")}
            >
              Extra Mörkrost
            </li>
          </ul>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
