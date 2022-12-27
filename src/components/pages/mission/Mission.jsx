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

const sampleMissions = [
  { id: 125123, title: "왕자님 만나기" },
  { id: 12512233, title: "서두르는척 유리구두 떨어트리기" },
  { id: 123415, title: "열두시에 집오기" },
];

const Mission = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [onAddMission, setOnAddMission] = useState(false);
  const [loadedMissions, setLoadedMissions] = useState(sampleMissions);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  let date = new Date();
  const thisMonth = date.getMonth() + 1;

  const onAddMissionHandler = () => {
    setOnAddMission((prev) => !prev);
  };

  const onModifyHandler = (modifiedTitle, targetId) => {
    setLoadedMissions(
      loadedMissions.map((mission) =>
        mission.id === targetId ? { ...mission, title: modifiedTitle } : mission
      )
    );
  };

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("https://kids-todo-9fa26-default-rtdb.firebaseio.com/todo-list.json")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const missions = [];

  //       for (const key in data) {
  //         const mission = {
  //           id: key,
  //           ...data[key],
  //         };
  //         missions.push(mission);
  //       }

  //       setIsLoading(false);
  //       setLoadedMissions(missions);
  //     });
  // }, []);

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
