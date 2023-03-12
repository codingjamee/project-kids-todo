import Input from "../../UI/Input";
import Card from "../../UI/Card";
import Button from "../../UI/Button";

import classes from "./Memo.module.css";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMemoData, fetchMemoData } from "../../store/MemoAct";
import MemoList from "./MemoList";
import Cookies from "universal-cookie";
import { getToken } from "../../store/authAct";
import { authActions } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

const Memo = () => {
  const dispatch = useDispatch();
  const accessKey = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const cookies = new Cookies();
  const refreshToken = cookies.get("refreshToken");
  const memoData = useSelector((state) => state.memo.memos);
  const user = useSelector((state) => state.auth.user);
  const tokenIsChanged = useSelector((state) => state.auth.tokenIsChanged);
  const inputTitle = useRef();
  const inputText = useRef();

  //MemoData 가져오기 api통신
  useEffect(() => {
    //user가 있거나 token이 변경된 경우 데이터 가져오기
    if (user || tokenIsChanged) {
      dispatch(fetchMemoData(accessKey));
      console.log(
        "토큰이 변경되거나 유저가 설정되어 미션목록을 다시 가져옵니다" +
          "user : " +
          user +
          "tokenIsChanged : " +
          tokenIsChanged
      );
      console.log(user);
    }
    //user가 없고 refreshToken이 있는경우 토큰재발급
    if (!user && refreshToken) {
      console.log("엑세스토큰이 없습니다. 엑세스토큰을 재발급합니다.");
      dispatch(getToken(refreshToken));
    }
    //refreshToken이 없는경우 로그아웃
    if (!refreshToken) {
      console.log("리프레시 토큰이 만료되었으므로 로그아웃합니다.");
      dispatch(authActions.logout());
      navigate("/login");
    }
  }, [dispatch, accessKey, user, refreshToken, tokenIsChanged, navigate]);

  const onSubmitMemo = (e) => {
    e.preventDefault();
    const memoTitle = inputTitle.current.value;
    const memoText = inputText.current.value;
    const inputMemo = { title: memoTitle, content: memoText };
    dispatch(addMemoData(inputMemo, accessKey));
    window.location.replace("/memo");
  };

  return (
    <>
      <Card>
        <form className={classes.control} onSubmit={onSubmitMemo}>
          <Input id="title" label="제목" ref={inputTitle} />
          <label htmlFor="text">내용</label>
          <textarea id="text" ref={inputText} />
          <Button type="submit">추가</Button>
        </form>
      </Card>
      <ul>
        {user &&
          memoData.map((data) => (
            <MemoList
              key={data.id}
              id={data.id}
              title={data.title}
              content={data.content}
              created={data.created_at}
              updated={data.updated_at}
            />
          ))}
      </ul>
    </>
  );
};
export default Memo;
