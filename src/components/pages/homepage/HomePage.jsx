import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../../UI/card/Card";

const HomePage = () => {
  const [login, setLogin] = useState(false);

  return (
    <Card>
      {login && <Link to="/mission">시작하기</Link>}
      {!login && (
        <>
          <p>미션수행으로 척척박사가 되어보세요!</p>
          <Link to="/login">시작하기</Link>
        </>
      )}
    </Card>
  );
};
export default HomePage;
