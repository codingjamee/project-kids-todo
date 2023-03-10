import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/authSlice";
import Button from "../../UI/Button";
import Card from "../../UI/Card";

const HomePage = () => {
  const ref = React.createRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const onUserStart = () => {
    navigate("/mission");
  };

  const onLoginStart = () => {
    dispatch(authActions.logout());
    navigate("/login");
  };

  return (
    <Card>
      {user && (
        <>
          <p>오늘의 미션을 수행해볼까요?</p>
          <Button ref={ref} onClick={onUserStart}>
            시작하기
          </Button>
        </>
      )}
      {!user && (
        <>
          <p>미션수행으로 척척박사가 되어보세요!</p>
          <Button ref={ref} onClick={onLoginStart}>
            시작하기
          </Button>
        </>
      )}
    </Card>
  );
};
export default HomePage;
