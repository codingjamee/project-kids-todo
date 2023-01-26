import { useEffect, useReducer, useState } from "react";
import Card from "../../UI/Card";
import Input from "../../UI/Input";
import classes from "./Login.module.css";
import { RiKakaoTalkFill } from "react-icons/ri";
import { BsFacebook } from "react-icons/bs";
import { SiGmail } from "react-icons/si";

//id유효성체크, @이 포함되어있는가?
const idReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  return { value: "", isValid: false };
};

//pw유효성 체크, 띄어쓰기 비포함, 6자이상인가?
const pwReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }

  return { value: "", isValid: false };
};

const Login = () => {
  const [idState, dispatchId] = useReducer(idReducer, {
    value: "",
    isValid: false,
  });
  const [pwState, dispatchPw] = useReducer(pwReducer, {
    value: "",
    isValid: false,
  });
  const [formIsValid, setFormIsValid] = useState("");
  const { isValid: idIsValid } = idState;
  const { isValid: pwIsValid } = pwState;
  const [login, setLogin] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit clicked");
    console.log(idState.value, pwState.value);
  };

  const idChangeHandler = (e) => {
    dispatchId({ type: "USER_INPUT", val: e.target.value });
  };
  const pwChangeHandler = (e) => {
    dispatchPw({ type: "USER_INPUT", val: e.target.value });
  };

  useEffect(() => {
    const validCheck = setTimeout(() => {
      setFormIsValid(idIsValid && pwIsValid);
    }, 100);
    return () => {
      clearTimeout(validCheck);
    };
  }, [idIsValid, pwIsValid]);

  return (
    <>
      <Card className={classes.login}>
        <form action="submit" onSubmit={submitHandler}>
          <Input
            type="email"
            id="email"
            label="아이디(이메일)"
            onChange={idChangeHandler}
            value={idState.value}
            placeholder="아이디를 입력해주세요"
          />
          {!idState.isValid && (
            <p>올바른 이메일을 입력해주세요 예: id@email.com</p>
          )}
          <Input
            type="password"
            id="password"
            label="비밀번호"
            onChange={pwChangeHandler}
            value={pwState.value}
            placeholder="비밀번호를 입력해주세요"
          />
          {!pwState.isValid && <p>7자리이상 입력해주세요</p>}
          <div className={classes.actions}>
            <button type="submit" disabled={!formIsValid}>
              로그인
            </button>
          </div>
        </form>
      </Card>
      <div className={classes.join}>
        <button>아이디찾기</button>
        <button>비밀번호 찾기</button>
        <button>회원가입</button>
      </div>

      <div className={classes.snslog}>
        <p>--- SNS 계정으로 계속하기 ---</p>
        <div className={classes.join}>
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
