import { useState } from "react";
import Card from "../UI/Card";
import Input from "../UI/Input/Input";

const Login = () => {
  const [idState, setIdState] = useState("");
  const [pwState, setPwState] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit clicked");
    console.log(idState, pwState);
  };

  const idChangeHandler = (e) => {
    setIdState(e.target.value);
  };
  const pwChangeHandler = (e) => {
    setPwState(e.target.value);
  };
  return (
    <Card>
      <form action="submit" onSubmit={submitHandler}>
        <Input
          type="email"
          id="email"
          label="아이디"
          onChange={idChangeHandler}
          value={idState}
        />
        <Input
          type="password"
          id="password"
          label="비밀번호"
          onChange={pwChangeHandler}
          value={pwState}
        />
        <button type="submit">로그인</button>
        <button>회원가입</button>
      </form>
    </Card>
  );
};

export default Login;
