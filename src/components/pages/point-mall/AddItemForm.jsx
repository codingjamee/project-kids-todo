import { createRef } from "react";
import { useDispatch } from "react-redux";
import { missionActions } from "../../store/missionSlice";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import Modal from "../../UI/Modal";

const AddItemForm = (props) => {
  const dispatch = useDispatch();
  const titleRef = createRef();
  const memoRef = createRef();

  const onSubmitAddItem = (e) => {
    e.preventDefault();
    const enteredTitle = titleRef.current.value;
    const enteredMemo = memoRef.current.value;
    dispatch(
      missionActions.add({
        id: new Date().getTime().toString(),
        title: enteredTitle,
        memo: enteredMemo,
      })
    );
  };
  return (
    <Modal onCloseModal={props.onformClose}>
      <form onSubmit={onSubmitAddItem}>
        <Input label="선물명" ref={titleRef} />
        <Input label="필요포인트" ref={memoRef} />
        <Button type="submit">추가하기</Button>
      </form>
    </Modal>
  );
};
export default AddItemForm;
