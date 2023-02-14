import { useEffect, useMemo, useState } from "react";
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
import { fetchMissionData } from "../../store/missionAct";
// import auth, { authActions } from "../../store/auth";

const Mission = () => {
  const [onAddMission, setOnAddMission] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const loadedData = useSelector((state) => state.mission.items);
  const dispatch = useDispatch();
  // const authToken = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  let date = new Date();
  const thisMonth = date.getMonth() + 1;

  const onAddMissionHandler = () => {
    setOnAddMission((prev) => !prev);
  };

  //로그아웃되면 login화면으로
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  //미션 내용 가져오기
  useEffect(() => {
    dispatch(fetchMissionData());
  }, [dispatch]);

  //미션 내용 수정 하기
  const onModifyHandler = (
    modifiedTitle,
    comp_cur,
    modified_tot_Count,
    targetId
  ) => {
    // fetch("http://localhost:8000/missions/", {
    //   method: "PUT",
    //   headers: {
    //     Authorization: authKey,
    //   },
    //   body: JSON.stringify({
    //     title: modifiedTitle,
    //     comp_cur: comp_cur,
    //     comp_tot: modified_tot_Count,
    //   }),
    // });
    // setLoadedMissions(
    //   loadedMissions.map((mission) =>
    //     mission.id === targetId ? { ...mission, title: modifiedTitle } : mission
    //   )
    // );
  };
  // console.log("authKey is: ", authKey);

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
              {loadedData.map((data) => (
                <MissionList
                  key={data.id}
                  id={data.id}
                  title={data.title}
                  cur_count={data.comp_cur}
                  tot_count={data.comp_tot}
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
