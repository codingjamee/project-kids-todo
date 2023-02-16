import { useRef, useState } from "react";

import Modal from "../../UI/Modal";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import Card from "../../UI/Card";
import { useDispatch, useSelector } from "react-redux";
import { modifyMission, removeMission } from "../../store/missionAct";

const MissionDetail = (props) => {
  const titleRef = useRef();
  const countRef = useRef();
  const [showModify, setShowModify] = useState(false);
  const dispatch = useDispatch();
  const missionItem = useSelector((state) => state.mission.items);
  // const showModify = useSelector((state) => state.ui.showModify);

  console.log(missionItem);
  const { id } = props;

  //수정창 열기
  const modifyHandler = () => {
    setShowModify((prev) => !prev);
  };

  //수정한 내용 제출
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const modifiedTitle = titleRef.current.value;
    const modified_tot_Count = countRef.current.value;
    const modifiedData = {
      title: modifiedTitle,
      comp_cur: missionItem.comp_cur || 0,
      comp_tot: modified_tot_Count,
    };
    dispatch(modifyMission(id, modifiedData));
  };

  //미션삭제하기
  const onRemove = () => {
    dispatch(removeMission(id));
  };

  //detail창 닫기
  const closeDetail = () => {
    props.openDetailHandler();
  };

  return (
    <Modal onCloseModal={closeDetail}>
      <p>this is {props.title} mission Detail</p>
      {!showModify && <Button onClick={modifyHandler}>수정하기</Button>}
      {showModify && (
        <Card>
          <form onSubmit={onSubmitHandler}>
            <Input label="미션명 수정" type="text" ref={titleRef} />
            <Input label="목표횟수 수정" type="number" ref={countRef} />
            <Button type="submit">제출</Button>
            <Button onClick={modifyHandler}>닫기</Button>
          </form>
        </Card>
      )}
      <Button onClick={onRemove}>삭제하기</Button>
      <Button>성공!</Button>
      <Button onClick={closeDetail}>닫기</Button>
    </Modal>
  );
};
export default MissionDetail;
