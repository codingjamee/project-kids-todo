import { useRef, useState } from "react";

import Modal from "../../UI/Modal";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import Card from "../../UI/Card";

const MissionDetail = (props) => {
  const [modifyState, setModifyState] = useState(false);
  const titleRef = useRef();
  const countRef = useRef();
  const { id } = props;

  //수정창 열기
  const modifyHandler = () => {
    setModifyState((prev) => !prev);
  };

  //수정한 내용 제출
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const modifiedTitle = titleRef.current.value;
    const modified_tot_Count = countRef.current.value;
    props.modifyMissionDetail(modifiedTitle, modified_tot_Count, id);
    setModifyState((prev) => !prev);
  };
  return (
    <Modal onCloseModal={props.onClose}>
      <p>this is {props.title} mission Detail</p>
      {!modifyState && <Button onClick={modifyHandler}>수정하기</Button>}
      {modifyState && (
        <Card>
          <form onSubmit={onSubmitHandler}>
            <Input label="미션명 수정" type="text" ref={titleRef} />
            <Input label="목표횟수 수정" type="number" ref={countRef} />
            <Button type="submit">제출</Button>
            <Button onClick={modifyHandler}>닫기</Button>
          </form>
        </Card>
      )}
      <Button>성공!</Button>
      <Button onClick={props.onClose}>닫기</Button>
    </Modal>
  );
};
export default MissionDetail;
