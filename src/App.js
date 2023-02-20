import "./App.css";
import Login from "./components/pages/login/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/homepage/HomePage";
import Join from "./components/pages/join/Join";
import Memo from "./components/pages/memo/Memo";
import Mission from "./components/pages/mission/Mission";
import PointMall from "./components/pages/point-mall/PointMall";
import StopWatch from "./components/pages/stop-watch/StopWatch";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <div>
      <Layout />
      <main>
        <Routes>
          <Route path="/" exact element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
          <Route path="/memo" element={<Memo />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/point-mall" element={<PointMall />} />
          <Route path="/stop-watch" element={<StopWatch />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
