import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import missionReducer from "./mission";

const store = configureStore({
  reducer: {
    auth: authReducer,
    mission: missionReducer,
  },
});

export default store;
