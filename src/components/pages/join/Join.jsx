import { useReducer } from "react";
import Card from "../../UI/Card";
import Input from "../../UI/Input";

const idReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const pwReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Join = () => {
  const [idState, dispatchId] = useReducer(idReducer, {
    value: "",
    isValid: true,
  });
  const [pwState, dispatchPw] = useReducer(pwReducer, {
    value: "",
    isValid: true,
  });

  const idChangeHandler = (event) => {
    dispatchId({ type: "USER_INPUT", val: event.target.value });
  };
  const pwChangeHandler = (event) => {
    dispatchPw({ type: "USER_INPUT", val: event.target.value });
  };
  const validateIdHandler = () => {
    dispatchId({ type: "INPUT_BLUR" });
  };
  const validatePwHandler = () => {
    dispatchPw({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <Card>
      <form action="submit" onSubmit={submitHandler}>
        <Input
          type="email"
          id="email"
          label="아이디(이메일)"
          placeholder="아이디를 입력해주세요"
          onChange={idChangeHandler}
          onBlur={validateIdHandler}
        />
        {!idState.isValid && <p>올바른 아이디를 입력해주세요</p>}
        <Input
          type="password"
          id="password"
          label="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          onChange={pwChangeHandler}
          onBlur={validatePwHandler}
        />
        {!pwState.isValid && <p>7자 이상의 비밀번호를 입력해주세요</p>}
      </form>
    </Card>
  );
};

export default Join;
