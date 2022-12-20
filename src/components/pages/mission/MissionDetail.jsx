import { useRef, useState } from "react";

import Modal from "../../UI/Modal";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import Card from "../../UI/Card";

const MissionDetail = (props) => {
  const [modifyState, setModifyState] = useState(false);
  const titleRef = useRef();
  const { id } = props;

  const modifyHandler = () => {
    setModifyState((prev) => !prev);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const modifiedTitle = titleRef.current.value;
    props.modifyMissionDetail(modifiedTitle, id);
    setModifyState((prev) => !prev);
  };
  return (
    <Modal onCloseModal={props.onClose}>
      <p>this is {props.title} mission Detail</p>
      {!modifyState && <Button onClick={modifyHandler}>수정하기</Button>}
      {modifyState && (
        <Card>
          <form onSubmit={onSubmitHandler}>
            <Input label="미션명 변경" type="text" ref={titleRef} />
            <Button type="submit">제출</Button>
          </form>
        </Card>
      )}
      <Button>성공!</Button>
      <Button onClick={props.onClose}>닫기</Button>
    </Modal>
  );
};
export default MissionDetail;
