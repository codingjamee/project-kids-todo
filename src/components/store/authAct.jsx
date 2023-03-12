import { authActions } from "./authSlice";
import jwt from "jwt-decode";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const userLogin = (formData) => {
  return async (dispatch) => {
    const login = async () => {
      const res = await fetch("http://localhost:8000/login/", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Error accured! The status is ${res.status}`);
      } else {
        return res.json();
      }
    };
    try {
      const data = await login(); // localStorage.setItem("authKey", authKey);
      //로컬스토리지에 저장하는 방식은 보안상 취약하므로 아래의 방식으로 변경
      dispatch(authActions.storeToken(data.access_token)); //store/auth에 access token을 저장
      //token을 decode
      const decoded = jwt(data.access_token);
      //token에서 온 user정보를 저장
      dispatch(authActions.storeUser(decoded));
      //refresh token을 cookie에 저장
      cookies.set("refreshToken", data.refresh_token, {
        expires: new Date(decoded.exp * 1000), //만료될때 삭제
        // httpOnly: true,
      });
    } catch (error) {}
  };
};

//access token가져오기
export const getToken = (authKey) => {
  return async (dispatch) => {
    const getAccessToken = async () => {
      const response = await fetch("http://localhost:8000/refresh-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authKey,
        },
      });
      const data = await response.json();
      return data;
    };
    try {
      console.log("액세스토큰 다시 가져오기");
      const fetchedAccess = await getAccessToken();
      console.log("액세스토큰을 재발급하였습니다: ", fetchedAccess);
      dispatch(authActions.changeToken(fetchedAccess.access_token)); //store/auth에 access token을 저장
      //token을 decode
      const decoded = jwt(fetchedAccess.access_token);
      //decode한 정보를 redux store에 저장
      dispatch(authActions.storeUser(decoded));
      //refresh token을 cookie에 저장
      cookies.set("refreshToken", fetchedAccess.refresh_token, {
        expires: new Date(decoded.exp * 1000), //만료될때 삭제
        // httpOnly: true,
      });
    } catch (error) {}
  };
};
