import { Link } from "react-router-dom";
import today_mission from "../images/mission.png";
import calender from "../images/calender.png";
import memo from "../images/memo.png";
import present2 from "../images/present2.png";
import timer from "../images/timer.png";

import classes from "./Navigation.module.css";
import { useState } from "react";

const Navigation = () => {
  const [missionHover, setMissionHover] = useState(false);
  const [watchHover, setWatchHover] = useState(false);
  const [boardHover, setBoardHover] = useState(false);
  return (
    <nav className={classes.nav}>
      <div className={classes.wrap}>
        <ul>
          <li>
            <Link to="/mission">
              <img
                src={calender}
                alt="mission"
                onMouseEnter={() => {
                  setMissionHover((prev) => !prev);
                }}
                onMouseLeave={() => {
                  setMissionHover((prev) => !prev);
                }}
              />
              <p
                style={
                  missionHover ? { display: "block" } : { display: "none" }
                }
              >
                미션목록
              </p>
            </Link>
          </li>
          <li>
            <Link to="/stop-watch">
              <img
                src={timer}
                alt="timer"
                onMouseEnter={() => {
                  setWatchHover((prev) => !prev);
                }}
                onMouseLeave={() => {
                  setWatchHover((prev) => !prev);
                }}
              />
              <p
                style={watchHover ? { display: "block" } : { display: "none" }}
              >
                스톱워치
              </p>
            </Link>
          </li>

          <li>
            <Link to="/memo">
              <img
                src={calender}
                alt="mission"
                onMouseEnter={() => {
                  setBoardHover((prev) => !prev);
                }}
                onMouseLeave={() => {
                  setBoardHover((prev) => !prev);
                }}
              />
              <p
                style={boardHover ? { display: "block" } : { display: "none" }}
              >
                게시판
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navigation;
