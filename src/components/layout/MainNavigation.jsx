import { Link } from "react-router-dom";

import logo from "../images/logo.png";
import login_logo from "../images/login_logo.png";
import join from "../images/join.png";

import classes from "./MainNavigation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/authSlice";
import Button from "../UI/Button";

const MainNavigation = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  //로그아웃 함수
  const onLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li className={classes.logo}>
            <Link to="/home">
              <img src={logo} alt="main-logo" />
            </Link>
          </li>
          {!user && (
            <>
              <li>
                <Link to="/login">
                  <img src={login_logo} alt="login-logo" />
                  <p>로그인</p>
                </Link>
              </li>
              <li>
                <Link to="/join">
                  <img src={join} alt="join" />
                  <p>회원가입</p>
                </Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <Link to="/">
                  <p>내 정보</p>
                </Link>
              </li>
              <li className={classes.font}>
                <Button onClick={onLogout}>로그아웃</Button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
export default MainNavigation;
