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
import { useSelector } from "react-redux";
import auth, { authActions } from "../../store/auth";

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
  // const authToken = useSelector((state) => state.auth.token);
  const authKey = localStorage.getItem("authKey");

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
  // console.log("authToken is: ", authToken);
  // console.log("authKey is: ", authKey);
  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8000/missions/", {
      method: "GET",
      headers: {
        // Authorization: authToken, //백엔드 refresh token 받아온 이후로 적용하기
        Authorization: authKey,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);

        setIsLoading(false);
        setLoadedMissions(data);
      });
  }, [authKey]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  return (
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
            <Card className="act" onClick={onAddMissionHandler}>
              <p>
                미션추가하기 <AiOutlinePlusCircle />
              </p>
            </Card>
          </section>
        </>
      )}
      {onAddMission && <AddMissionForm onformClose={onAddMissionHandler} />}
    </Card>
  );
};

export default Mission;
