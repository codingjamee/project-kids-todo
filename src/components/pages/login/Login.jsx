import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../UI/Card";
import Input from "../../UI/Input";
import classes from "./Login.module.css";
import { RiKakaoTalkFill } from "react-icons/ri";
import { BsFacebook } from "react-icons/bs";
import { SiGmail } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../store/authAct";

//id유효성체크, @이 포함되어있는가?
// id유효성 검사
const idReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

//pw유효성 체크, 띄어쓰기 비포함, 6자이상인가?
// pw유효성 검사
const pwReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = () => {
  const [idState, dispatchId] = useReducer(idReducer, {
    value: "",
    isValid: true,
  });
  const [pwState, dispatchPw] = useReducer(pwReducer, {
    value: "",
    isValid: true,
  });
  const [formIsValid, setFormIsValid] = useState("");
  const { isValid: idIsValid } = idState;
  const { isValid: pwIsValid } = pwState;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  //cookie에 access, refresh token을 저장하는 방식
  //일단 redux에 access token을 저장, refresh token은 cookie에 저장 방식 채택
  // const setCookie = (name, value, options = {}) => {
  //   const { path, domain, secure } = options;
  //   let { expires } = options;
  //   let cookieString = `${name}=${value};`;

  //   if (expires) {
  //     if (expires instanceof Date) {
  //       expires = expires.toUTCString();
  //     }
  //     cookieString += `expires=${expires};`;
  //   }

  //   if (path) {
  //     cookieString += `path=${path};`;
  //   }

  //   if (domain) {
  //     cookieString += `domain=${domain};`;
  //   }

  //   if (secure) {
  //     cookieString += "secure;";
  //   }

  //   document.cookie = cookieString;
  //   navigate("/home");
  // };

  //로그인 버튼 클릭시, api통신
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("submit clicked");
    console.log(idState.value, pwState.value);

    //login시 필요한 data형식이 formData이므로 형식에 맞게 만들어주기
    const formData = new FormData();
    formData.append("username", `${idState.value}`);
    formData.append("password", `${pwState.value}`);
    dispatch(userLogin(formData));
  };

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  const idChangeHandler = (e) => {
    dispatchId({ type: "USER_INPUT", val: e.target.value });
  };
  const idBlurHandler = () => {
    dispatchId({ type: "INPUT_BLUR" });
  };
  const pwChangeHandler = (e) => {
    dispatchPw({ type: "USER_INPUT", val: e.target.value });
  };
  const pwBlurHandler = () => {
    dispatchPw({ type: "INPUT_BLUR" });
  };

  // idState와 pwState가 변경될 때마다 validCheck
  // 0.1초마다 하는데 check가 남아있지 않도록 다시 시작할때마다 clearTimeout 실행
  //formIsValid여야 버튼 활성화
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
            onBlur={idBlurHandler}
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
            onBlur={pwBlurHandler}
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
