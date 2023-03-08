import { Link } from "react-router-dom";
import today_mission from "../images/mission.png";
import calender from "../images/calender.png";
import memo from "../images/memo.png";
import present2 from "../images/present2.png";
import timer from "../images/timer.png";

import classes from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={classes.nav}>
      <ul>
        {/* <li>
          <Link to="/todayMission">
            <img src={today_mission} alt="today_mission" />
          </Link>
        </li> */}
        <li>
          <Link to="/mission">
            <img src={calender} alt="mission" />
          </Link>
        </li>
        <li>
          <Link to="/stop-watch">
            <img src={timer} alt="timer" />
          </Link>
        </li>
        <li>
          <Link to="/point-mall">
            <img src={present2} alt="present" />
          </Link>
        </li>
        <li>
          <Link to="/memo">
            <img src={memo} alt="memo" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navigation;
