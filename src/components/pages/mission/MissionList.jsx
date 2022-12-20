import { useState } from "react";
import Card from "../../UI/Card";

import classes from "./MissionList.module.css";
import MissionDetail from "./MissionDetail";
const MissionList = (props) => {
  const [missionDetail, setmissionDetail] = useState(false);

  const missionDetailHandler = () => {
    setmissionDetail((prev) => !prev);
  };

  const modifyMission = (modifiedTitle, id) => {
    props.onModify(modifiedTitle, id);
  };
  return (
    <>
      <li key={props.id}>
        <Card onClick={missionDetailHandler} className={classes.pointer}>
          <p>{props.title}</p>
        </Card>
      </li>
      {missionDetail && (
        <MissionDetail
          title={props.title}
          id={props.id}
          onClose={missionDetailHandler}
          modifyMissionDetail={modifyMission}
        />
      )}
    </>
  );
};
export default MissionList;
