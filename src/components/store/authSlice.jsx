import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const initialAuthState = {
  token: null,
  user: null,
  tokenIsChanged: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    storeToken(state, action) {
      console.log("엑세스토큰을 저장하였습니다.");
      state.token = action.payload;
      console.log("state token: ", state.token);
      state.tokenIsChanged = false;
    },

    logout(state) {
      state.token = null;
      state.user = null;
      cookies.remove("refreshToken");
    },
    storeUser(state, action) {
      console.log("user정보를 저장하였습니다.");
      state.user = action.payload;
    },
    changeToken(state, action) {
      console.log("엑세스토큰을 다시 저장하였습니다.");
      state.token = action.payload;
      state.tokenIsChanged = true;
    },
    endTokenChange(state) {
      state.tokenIsChanged = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
