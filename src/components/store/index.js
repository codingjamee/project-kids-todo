import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import authReducer from "./auth";
import missionReducer from "./mission";
import auth from "./auth";

const reducers = combineReducers({
  auth: authReducer,
  mission: missionReducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["mission"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
