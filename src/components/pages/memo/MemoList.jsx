import { useState } from "react";
import Card from "../../UI/Card";
import MemoDetail from "./MemoDetail";

const MemoList = (props) => {
  const [openDetail, setOpenDetail] = useState(false);
  const openDetailHandler = () => {
    setOpenDetail((prev) => !prev);
  };

  return (
    <>
      <li>
        <Card onClick={openDetailHandler}>
          <h1>{`메모제목 : ${props.title} (${props.created} 작성)`}</h1>
        </Card>
      </li>
      {openDetail && (
        <MemoDetail
          title={props.title}
          content={props.content}
          created={props.created}
          updated={props.updated}
          memoDetailHandler={openDetailHandler}
        />
      )}
    </>
  );
};
export default MemoList;
