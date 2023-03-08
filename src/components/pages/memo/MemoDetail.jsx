import Card from "../../UI/Card";
import Modal from "../../UI/Modal";

const MemoDetail = (props) => {
  const closeDetail = () => {
    props.memoDetailHandler();
  };
  return (
    <Modal onCloseModal={closeDetail}>
      <Card>
        <h1>{props.title}</h1>
        <h3>{props.created}</h3>
        <p>{props.content}</p>
      </Card>
    </Modal>
  );
};
export default MemoDetail;
