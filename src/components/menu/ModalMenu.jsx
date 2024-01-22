import React, { useEffect, useState, useRef, useCallback } from "react";
import classes from "./ModalMenu.module.css";

const ModalMenu = ({ setModalOpenMenu, setView }) => {
  const menuRef = useRef();
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setModalOpenMenu(false);
      setIsClosing(false);
    }, 1000);
  }, [setIsClosing, setModalOpenMenu]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        handleClose();
      }
    };

    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [handleClose]);

  return (
    <div className={classes.backdrop}>
      <div
        className={`${classes.dropdownMenu} ${
          isClosing ? classes.slideOut : classes.slideIn
        }`}
        ref={menuRef}
      >
        <ul>
          <li
            onClick={() => {
              setView("products");
              handleClose();
            }}
          >
            Hem
          </li>
          <li
            onClick={() => {
              setView("lightRoast");
              handleClose();
            }}
          >
            Ljusrost
          </li>
          <li
            onClick={() => {
              setView("mediumRoast");
              handleClose();
            }}
          >
            Mellanrost
          </li>
          <li
            onClick={() => {
              setView("darkRoast");
              handleClose();
            }}
          >
            Mörkrost
          </li>
          <li
            onClick={() => {
              setView("extraDarkRoast");
              handleClose();
            }}
          >
            Extra Mörkroast
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ModalMenu;
