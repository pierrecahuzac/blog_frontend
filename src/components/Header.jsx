import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { MdLightbulb, MdLightbulbOutline } from "react-icons/md";
import { FaBloggerB } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { useUserContext } from "../utils/userContext";
import { useGlobalContext } from "../utils/globalContext";
import { ToastContainer, toast } from "react-toastify";
import { successToast, errorToast } from "./Toast";
import moon from "../assets/png/moon.png";
import sun from "../assets/png/sun.png";
import logo from "../assets/svg/blog-writing-svgrepo-com.svg";
import "react-toastify/dist/ReactToastify.css";
import "../assets/CSS/header.scss";

export default function Header() {
  const { user, setUser } = useUserContext();
  const { isDarkMode, setIsDarkMode } = useGlobalContext();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const closeMenu = () => {
    setMenuIsOpen(false);
  };
  const openMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };
  const changeDarkMode = (e) => {
    e.preventDefault();
    setIsDarkMode(!isDarkMode);
  };
  const signout = () => {
    setUser({ ...user, logged: false });
    successToast("Utilisateur déconnecté avec succès");
    console.log("je me déco");
  };
  return (
    <header className={isDarkMode ? "header--dark" : "header"}>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <nav className="header_container">
        <div className="header_logo_container">
          <Link to="/">
            <img src={logo} alt="logo" className="header_logo" />
          </Link>
        </div>

        <div className="header_menu_desktop">
          <ul className="header_links">
            <li className="header_link">
              <NavLink to="/">ACCUEIL</NavLink>
            </li>
            <li className="header_link_input">
              <input
                type="text"
                value={inputValue}
                className="header_input"
                onChange={handleInput}
                placeholder="Utilisateur recherché"
              />
              <Link to={`/blog/user/${inputValue}`}>
                {inputValue && (
                  <button action="submit" className="btn_search">
                    RECHERCHER
                  </button>
                )}
              </Link>
            </li>

            {user.logged ? (
              <div className="header_link_connection">
                <li className="header_link">
                  <NavLink
                    to={`/profile/user/${user.userId}`}
                    onClick={closeMenu}
                  >
                    {user.username.toUpperCase()}
                  </NavLink>
                </li>
                <li className="header_link_signout" onClick={signout}>
                  SE DECONNECTER
                </li>
              </div>
            ) : (
              <div className="header_links_connection">
                <li className="header_link">
                  <NavLink to="/signup" onClick={closeMenu}>
                    S'INSCRIRE
                  </NavLink>
                </li>
                <li className="header_link">
                  <NavLink to="/signin" onClick={closeMenu}>
                    SE CONNECTER
                  </NavLink>
                </li>
              </div>
            )}

            <li className="header_link">
              <div onClick={changeDarkMode} className="header_btn_dark">
                {isDarkMode ? (
                  <img src={sun} className="header_btn_dark_svg" alt="" />
                ) : (
                  <img src={moon} className="header_btn_dark_svg" alt="" />
                )}
              </div>
            </li>
          </ul>
        </div>
        <div
          className={
            menuIsOpen ? "header_menu_mobile open" : "header_menu_mobile close"
          }
        >
          <ul className="header_links_mobile">
            <input
              type="text"
              value={inputValue}
              className="header_input"
              onChange={handleInput}
              placeholder="Utilisateur recherché"
            />
            <li className="header_link_mobile home">
              <NavLink to="/" onClick={closeMenu}>
                ACCUEIL
              </NavLink>
            </li>
            {user.logged ? (
              <div className="header_link_connection_mobile">
                <li className="header_link_mobile">
                  <NavLink
                    to={`/profile/user/${user.userId}`}
                    onClick={closeMenu}
                  >
                    {user.username.toUpperCase()}
                  </NavLink>
                </li>
                <li className="header_link_mobile signout" onClick={signout}>
                  SE DECONNECTER
                </li>
              </div>
            ) : (
              <div className="header_links_connection">
                <li className="header_link_mobile">
                  <NavLink to="/signup" onClick={closeMenu}>
                    S'INSCRIRE
                  </NavLink>
                </li>
                <li className="header_link_mobile">
                  <NavLink to="/signin" onClick={closeMenu}>
                    SE CONNECTER
                  </NavLink>
                </li>
                <li className="header_link">
                  <button className="header_btn_dark">
                    {isDarkMode ? (
                      <img
                        src={sun}
                        onClick={changeDarkMode}
                        className="header_btn_dark_svg"
                        alt=""
                      />
                    ) : (
                      <img
                        src={moon}
                        onClick={changeDarkMode}
                        className="header_btn_dark_svg"
                        alt=""
                      />
                    )}
                  </button>
                </li>
              </div>
            )}
            <li className="header_link_mobile burger_close">
              <RxCross1 onClick={closeMenu} />
            </li>
          </ul>
        </div>
        <div className="header_burgermenu_button">
          {menuIsOpen ? (
            <RxCross1 onClick={closeMenu} />
          ) : (
            <RxHamburgerMenu
              onClick={openMenu}
              className="header_burgermenu_button_close"
            />
          )}
        </div>
      </nav>
    </header>
  );
}
