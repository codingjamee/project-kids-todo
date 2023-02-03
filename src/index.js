import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import { Provider } from "react-redux";
import store from "./components/store/index";

export let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      {/* store를 구독 */}
      <PersistGate loading={null} persistor={persistor}>
        {/* store값이 redux에 저장될 때까지 app 렌더링 지연 */}
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
