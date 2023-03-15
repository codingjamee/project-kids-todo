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
import Cookies from "universal-cookie";
import { fetchMissionData } from "../../store/missionAct";
import { getToken } from "../../store/authAct";
import { authActions } from "../../store/authSlice";
// import auth, { authActions } from "../../store/auth";

const Mission = () => {
  const [onAddMission, setOnAddMission] = useState(false);
  let date = new Date();
  const thisMonth = date.getMonth() + 1;
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const loadedData = useSelector((state) => state.mission.items);
  const authToken = useSelector((state) => state.auth.token);
  const refreshToken = cookies.get("refreshToken");
  const tokenIsChanged = useSelector((state) => state.auth.tokenIsChanged);

  console.log(loadedData);
  const onAddMissionHandler = () => {
    setOnAddMission((prev) => !prev);
  };

  //미션 내용 가져오기
  useEffect(() => {
    if (user || tokenIsChanged) {
      //user가 있거나 token이 변경된 경우 미션목록을 다시 가져오기
      console.log(
        "토큰이 변경되거나 유저가 설정되어 미션목록을 다시 가져옵니다" +
          " user : " +
          user +
          " tokenIsChanged : " +
          tokenIsChanged
      );
      console.log(user);

      dispatch(fetchMissionData(authToken));
    }
    //authToken이 없고 refreshToken이 있는경우 토큰 재발급
    if (!user && refreshToken) {
      console.log("엑세스토큰이 없습니다. 엑세스토큰을 재발급합니다.");
      dispatch(getToken(refreshToken));
    }

    //refreshToken이 없을때 로그아웃.
    if (!refreshToken) {
      //로그아웃을 누르거나 refreshToken이 만료되면 logout후 login화면으로
      console.log("리프레시 토큰이 만료되었으므로 로그아웃합니다.");
      dispatch(authActions.logout());
      navigate("/login");
    }
  }, [dispatch, navigate, authToken, refreshToken, user, tokenIsChanged]);

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
