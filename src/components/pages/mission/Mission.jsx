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
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice";
// import auth, { authActions } from "../../store/auth";

const sampleMissions = [
  { id: 125123, title: "왕자님 만나기" },
  { id: 12512233, title: "서두르는척 유리구두 떨어트리기" },
  { id: 123415, title: "열두시에 집오기" },
];

const Mission = () => {
  const [onAddMission, setOnAddMission] = useState(false);
  const [loadedMissions, setLoadedMissions] = useState(sampleMissions);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  // const authToken = useSelector((state) => state.auth.token);
  const authKey = localStorage.getItem("authKey");
  const navigate = useNavigate();
  let date = new Date();
  const thisMonth = date.getMonth() + 1;

  const onAddMissionHandler = () => {
    setOnAddMission((prev) => !prev);
  };

  //미션 내용 수정 하기
  const onModifyHandler = (
    modifiedTitle,
    comp_cur,
    modified_tot_Count,
    targetId
  ) => {
    fetch("http://localhost:8000/missions/", {
      method: "PUT",
      headers: {
        Authorization: authKey,
      },
      body: JSON.stringify({
        title: modifiedTitle,
        comp_cur: comp_cur,
        comp_tot: modified_tot_Count,
      }),
    });
    setLoadedMissions(
      loadedMissions.map((mission) =>
        mission.id === targetId ? { ...mission, title: modifiedTitle } : mission
      )
    );
  };
  // console.log("authKey is: ", authKey);

  //미션 내용 가져오기
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
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <Card>
      {user && (
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
                  cur_count={mission.comp_cur}
                  tot_count={mission.comp_tot}
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
