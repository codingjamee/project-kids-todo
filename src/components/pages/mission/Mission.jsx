import { useEffect, useState } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../UI/Card";
import classes from "./Mission.module.css";
import AddMissionForm from "./AddMissionForm";
import MissionList from "./MissionList";

const missions = [
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
  const [onAddMission, setOnAddMission] = useState(false);
  const [loadedMissions, setLoadedMissions] = useState([]);

  const navigate = useNavigate();
  let date = new Date();
  const thisMonth = date.getMonth() + 1;

  const onAddMissionHandler = () => {
    setOnAddMission((prev) => !prev);
  };

  const onModifyHandler = (modifiedTitle, targetId) => {
    setLoadedMissions(
      missions.map((mission) =>
        mission.id === targetId ? { ...mission, title: modifiedTitle } : mission
      )
    );
  };

  useEffect(() => {
    setLoadedMissions(missions);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Card>
        {isLoggedIn && (
          <>
            <section className={classes.month}>
              <Link to="/last-month">
                <AiOutlineArrowLeft />
              </Link>
              <div>{`${thisMonth}월 나의미션`}</div>
              <Link to="/next-month">
                <AiOutlineArrowRight />
              </Link>
            </section>
            <section>
              <ul>
                {loadedMissions.map((mission) => (
                  <MissionList
                    key={mission.id}
                    id={mission.id}
                    title={mission.title}
                    onModify={onModifyHandler}
                  />
                ))}
              </ul>
              <Card className={classes.pointer} onClick={onAddMissionHandler}>
                <p>
                  미션추가하기 <AiOutlinePlusCircle />
                </p>
              </Card>
            </section>
          </>
        )}
      </Card>
      {onAddMission && <AddMissionForm onformClose={onAddMissionHandler} />}
    </>
  );
};

export default Mission;
