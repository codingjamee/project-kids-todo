import { useEffect, useRef, useState } from "react";

import Modal from "../../UI/Modal";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import Card from "../../UI/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMissionDetailData,
  modifyMission,
  removeMission,
} from "../../store/missionAct";

const MissionDetail = (props) => {
  const titleRef = useRef();
  const countRef = useRef();
  const [showModify, setShowModify] = useState(false);
  const dispatch = useDispatch();
  const missionDetail = useSelector((state) => state.mission.detailItem);
  const authToken = useSelector((state) => state.auth.token);

  const { id } = props;

  useEffect(() => {
    dispatch(fetchMissionDetailData(id, authToken));
  }, [dispatch, id, authToken]);

  //수정창 열기
  const modifyHandler = () => {
    setShowModify((prev) => !prev);
  };

  //성공클릭
  const onClickComp = () => {
    const curTitle = missionDetail.title;
    const curTotCount = missionDetail.comp_tot;
    const modifiedCurCount = missionDetail.comp_cur + 1;
    const modifiedData = {
      title: curTitle,
      comp_cur: modifiedCurCount,
      comp_tot: curTotCount,
    };
    dispatch(modifyMission(id, modifiedData, authToken));
    window.location.replace("/mission");
  };

  //수정한 내용 제출
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const modifiedTitle = titleRef.current.value;
    const modified_tot_Count = countRef.current.value;
    const modifiedData = {
      title: modifiedTitle,
      comp_cur: missionDetail.comp_cur || 0,
      comp_tot: modified_tot_Count,
    };
    dispatch(modifyMission(id, modifiedData, authToken));
    window.location.replace("/mission");
    console.log("수정후 mission으로 navigate보내기");
  };

  //미션삭제하기
  const onRemove = () => {
    dispatch(removeMission(id, authToken));
    window.location.replace("/mission");
  };

  //detail창 닫기
  const closeDetail = () => {
    props.openDetailHandler();
  };

  return (
    <Modal onCloseModal={closeDetail}>
      <p>나의 미션은 : {missionDetail.title}</p>
      <p>현재 달성 횟수는 : {missionDetail.comp_cur}</p>
      <p>이번달 성공 목표횟수는 : {missionDetail.comp_tot}</p>
      {!showModify && <Button onClick={modifyHandler}>수정하기</Button>}
      {showModify && (
        <Card>
          <form onSubmit={onSubmitHandler}>
            <Input
              label="미션명 수정"
              type="text"
              ref={titleRef}
              defaultValue={missionDetail.title}
            />
            <Input
              label="목표횟수 수정"
              type="number"
              ref={countRef}
              defaultValue={missionDetail.comp_tot}
            />
            <Button type="submit">제출</Button>
            <Button onClick={modifyHandler}>닫기</Button>
          </form>
        </Card>
      )}
      <Button onClick={onRemove}>삭제하기</Button>
      <Button onClick={onClickComp}>성공!</Button>
      <Button onClick={closeDetail}>닫기</Button>
    </Modal>
  );
};
export default MissionDetail;
