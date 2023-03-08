import { configureStore } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
// import {
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
import authReducer from "./authSlice";
import missionReducer from "./missionSlice";
import uiReducer from "./uiSlice";
import memoReducer from "./memoSlice";

// const persistConfig = {
//   key: "root",
//   storage,
//   blacklist: ["mission"],
// };

// const reducers = combineReducers({
//   auth: authReducer,
//   mission: missionReducer,
//   ui: uiReducer,
//   memo: memoReducer,
// });

// const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: {
    auth: authReducer,
    mission: missionReducer,
    ui: uiReducer,
    memo: memoReducer,
  },
});

export default store;
