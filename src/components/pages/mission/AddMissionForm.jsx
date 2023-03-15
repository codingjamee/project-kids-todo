import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMission } from "../../store/missionAct";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import Modal from "../../UI/Modal";

const AddMissionForm = (props) => {
  const dispatch = useDispatch();
  const titleRef = useRef();
  const countRef = useRef(0);
  const accessKey = useSelector((state) => state.auth.token);

  const onSubmitAddMission = (e) => {
    e.preventDefault();
    const enteredTitle = titleRef.current.value;
    // const enteredMemo = memoRef.current.value;
    const enteredCount = countRef.current.value;

    const enteredMission = {
      title: enteredTitle,
      comp_cur: 0,
      comp_tot: enteredCount,
    };

    dispatch(addMission(enteredMission, accessKey));
    props.onformClose();
  };

  return (
    <Modal onCloseModal={props.onformClose}>
      <h1>미션추가하기</h1>
      <form onSubmit={onSubmitAddMission}>
        <Input label="미션명" ref={titleRef} />
        <Input label="목표횟수" type="number" ref={countRef} />
        <Button type="submit">추가하기</Button>
      </form>
    </Modal>
  );
};
export default AddMissionForm;
