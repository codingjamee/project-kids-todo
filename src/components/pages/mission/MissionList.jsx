import Card from "../../UI/Card";

import MissionDetail from "./MissionDetail";
import { useState } from "react";
const MissionList = (props) => {
  const [openDetail, setOpenDetail] = useState(false);

  //미션상세창 열기
  const missionDetailHandler = () => {
    setOpenDetail((prev) => !prev);
  };

  return (
    <>
      <li key={props.id}>
        <Card onClick={missionDetailHandler} className="act">
          <p>{props.title}</p>
          <progress value={props.cur_count} min="0" max={props.tot_count} />
        </Card>
      </li>
      {openDetail && (
        <MissionDetail
          title={props.title}
          id={props.id}
          openDetailHandler={missionDetailHandler}
        />
      )}
    </>
  );
};
export default MissionList;
