import { useState } from "react";
import Card from "../UI/Card";
import Input from "../UI/Input/Input";
import classes from "./Login.module.css";
import { RiKakaoTalkFill } from "react-icons/ri";
import { BsFacebook } from "react-icons/bs";
import { SiGmail } from "react-icons/si";

import { IconContext } from "react-icons";

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
    <>
      <Card className={classes.login}>
        <form action="submit" onSubmit={submitHandler}>
          <Input
            type="email"
            id="email"
            label="아이디(이메일)"
            onChange={idChangeHandler}
            value={idState}
            placeholder="아이디를 입력해주세요"
          />
          <Input
            type="password"
            id="password"
            label="비밀번호"
            onChange={pwChangeHandler}
            value={pwState}
            placeholder="비밀번호를 입력해주세요"
          />
          <div className={classes.actions}>
            <button type="submit">로그인</button>
          </div>
        </form>
      </Card>
      <div className={classes.signup}>
        <button>아이디찾기</button>
        <button>비밀번호 찾기</button>
        <button>회원가입</button>
      </div>

      <div className={classes.snslog}>
        <p>--- SNS 계정으로 로그인 ---</p>
        <div className={classes.signup}>
          <button className={classes.kakao}>
            <RiKakaoTalkFill />
          </button>
          <button className={classes.facebook}>
            <BsFacebook />
          </button>
          <button className={classes.gmail}>
            <SiGmail />
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
