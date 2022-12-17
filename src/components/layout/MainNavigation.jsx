import { Link } from "react-router-dom";

import logo from "../images/logo.png";
import login_logo from "../images/login_logo.png";
import join from "../images/join.png";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li className={classes.logo}>
            <Link to="/">
              <img src={logo} alt="main-logo" />
            </Link>
          </li>
          <li>
            <Link to="/login">
              <img src={login_logo} alt="login-logo" />
            </Link>
          </li>
          <li>
            <Link to="/join">
              <img src={join} alt="join" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default MainNavigation;
