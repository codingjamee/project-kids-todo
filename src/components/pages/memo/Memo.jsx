import Input from "../../UI/Input";
import Card from "../../UI/Card";
import Button from "../../UI/Button";

import classes from "./Memo.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMemoData } from "../../store/MemoAct";
import MemoList from "./MemoList";

const Memo = () => {
  const dispatch = useDispatch();
  const memoData = useSelector((state) => state.memo.memos);

  //MemoData 가져오기 api통신
  useEffect(() => {
    dispatch(fetchMemoData());
  }, [dispatch]);

  return (
    <>
      <Card>
        <form className={classes.control}>
          <Input id="title" label="제목" />
          <label htmlFor="text">내용</label>
          <textarea id="text" />
          <Button>추가</Button>
        </form>
      </Card>
      <ul>
        {memoData.map((data) => (
          <MemoList
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
