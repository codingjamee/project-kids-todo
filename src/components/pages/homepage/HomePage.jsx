import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../UI/Button";
import Card from "../../UI/Card";

const HomePage = () => {
  const [login, setLogin] = useState(true);
  const ref = React.createRef();
  const navigate = useNavigate();

  const onUserStart = () => {
    navigate("/mission");
  };

  const onLoginStart = () => {
    navigate("/login");
  };

  return (
    <Card>
      {login && (
        <>
          <p>오늘의 미션을 수행해볼까요?</p>
          <Button ref={ref} onClick={onUserStart}>
            시작하기
          </Button>
        </>
      )}
      {!login && (
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
