import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addMission } from "../../store/missionAct";
import { missionActions } from "../../store/missionSlice";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import Modal from "../../UI/Modal";

const AddMissionForm = (props) => {
  const dispatch = useDispatch();
  const titleRef = useRef();
  const memoRef = useRef();
  const countRef = useRef(0);
  const authKey = localStorage.getItem("authKey");

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

    dispatch(addMission(enteredMission));
  };

  return (
    <Modal onCloseModal={props.onformClose}>
      <form onSubmit={onSubmitAddMission}>
        <Input label="미션명" ref={titleRef} />
        <Input label="목표횟수" type="number" ref={countRef} />
        <Button type="submit">추가하기</Button>
      </form>
    </Modal>
  );
};
export default AddMissionForm;
