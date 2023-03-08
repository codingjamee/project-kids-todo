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
          <p>{props.title}</p>
          <p>{props.created}</p>
        </Card>
      </li>
      {openDetail && (
        <MemoDetail
          title={props.title}
          content={props.content}
          created={props.created}
          updated={props.updated_at}
          memoDetailHandler={openDetailHandler}
        />
      )}
    </>
  );
};
export default MemoList;
