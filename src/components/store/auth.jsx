import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload;
      console.log(state.token);
    },

    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      window.localStorage.removeItem("authKey");
    },
    user(state, action) {
      state.user = action.payload;
      console.log(state.user);
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
