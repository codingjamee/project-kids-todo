import { useEffect, useState } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../UI/card/Card";
import classes from "./Mission.module.css";

const missionList = [
  {
    id: 1,
    title: "청소하기",
  },
  {
    id: 2,
    title: "공부하기",
  },
];

const Mission = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();
  let date = new Date();
  const thisMonth = date.getMonth() + 1;
  const onAddMission = () => {};

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const onSettingHandler = () => {
    console.log("setting Clicked!");
  };

  const onAddMissionHandler = () => {
    console.log("onAddMissionHandler Clicked!");
  };
  return (
    <Card>
      {isLoggedIn && (
        <>
          <div className={classes.month}>
            <Link to="/last-month">
              <AiOutlineArrowLeft />
            </Link>
            <div>{`${thisMonth}월 나의미션`}</div>
            <Link to="/next-month">
              <AiOutlineArrowRight />
            </Link>
          </div>
          <section>
            <ul>
              {missionList.map((mission) => (
                <li key={mission.id}>
                  <Card onClick={onSettingHandler}>
                    <p>{mission.title}</p>
                  </Card>
                </li>
              ))}
              <Card onClick={onAddMissionHandler}>
                <p>
                  미션추가하기 <AiOutlinePlusCircle />
                </p>
              </Card>
            </ul>
          </section>
        </>
      )}
    </Card>
  );
};

export default Mission;
