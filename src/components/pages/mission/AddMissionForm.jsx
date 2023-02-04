import { useRef } from "react";
import { useDispatch } from "react-redux";
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

  const onSubmitAddMission = () => {
    const enteredTitle = titleRef.current.value;
    // const enteredMemo = memoRef.current.value;
    const enteredCount = countRef.current.value;
    console.log(enteredCount);

    const enteredMission = {
      title: enteredTitle,
      comp_cur: 0,
      comp_tot: enteredCount,
    };
    fetch("http://localhost:8000/missions/", {
      method: "POST",
      headers: {
        // Authorization: authToken, //백엔드 refresh token 받아온 이후로 적용하기
        "Content-type": "Application/json",
        Authorization: authKey,
      },
      body: JSON.stringify(enteredMission),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
    // dispatch(
    //   missionActions.add({
    //     id: new Date().getTime().toString(),
    //     title: enteredTitle,
    //     memo: enteredMemo,
    //   })
    // );
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
