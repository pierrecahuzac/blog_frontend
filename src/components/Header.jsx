import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import "../assets/CSS/header.css";

export default function Header({ userExist, setUserExist }) {
  const [isLogged, setIsLogged] = useState(false);

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const closeMenu = () => {
    setMenuIsOpen(false);
  };
  const openMenu = () => {
    setMenuIsOpen(true);
  };
  let activeStyle = {
    textDecoration: "underline",
  };

  let activeClassName = "underline";

  return (
    <header className="header">
      <nav className="header_nav desktop">
        <div className="nav_logo">
          <NavLink
            to="/"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Home
          </NavLink>
        </div>{" "}
        {!isLogged ? (
          <div className="nav_links">
            <Link to="/signup" className="link link_signup">
              <>Signup</>
            </Link>

            {userExist.logged ? (
              <Link to={`/user/${userExist.userId}/backoffice`}>
                {userExist.display_name}
              </Link>
            ) : (
              <Link to="/signin" className="link link_signup">
                <>Signin</>
              </Link>
            )}

            <Link to="/blog" className="link link_blog">
              <> Blog</>
            </Link>
          </div>
        ) : (
          <div className="nav_links">
            <Link to="/backoffice" className="link link_backoffice">
              <>Mon Espace</>
            </Link>
            <Link to="/mon-blog" className="link link_backoffice">
              <>Mon blog</>
            </Link>
          </div>
        )}
        <div className="nav_burger-menu">
          <RxHamburgerMenu onClick={openMenu} />
        </div>
      </nav>

      {/* mobile  */}
      <nav className={"header_nav mobile" + (menuIsOpen ? " open" : " close")}>
        <div className="nav_logo">
          <NavLink
            to="/"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
            onClick={closeMenu}
          >
            Home
          </NavLink>
        </div>{" "}
        {!isLogged ? (
          <div className="nav_links">
            <Link to="/signup" className="link link_signup" onClick={closeMenu}>
              <>Signup</>
            </Link>
            <Link to="/signin" className="link link_signup" onClick={closeMenu}>
              <>Signin</>
            </Link>
            <Link to="/blog" className="link link_blog" onClick={closeMenu}>
              <> Blog</>
            </Link>
          </div>
        ) : (
          <div className="nav_links">
            <Link
              to="/backoffice"
              className="link link_backoffice"
              onClick={closeMenu}
            >
              <>Mon Espace</>
            </Link>
            <Link
              to="/mon-blog"
              className="link link_backoffice"
              onClick={closeMenu}
            >
              <>Mon blog</>
            </Link>
          </div>
        )}
        <div className="nav_burger-menu">
          <RxCross1
            onClick={closeMenu}
            className={"nav_burger-icon" + (menuIsOpen ? " open" : "close")}
          />
        </div>
      </nav>
    </header>
  );
}
