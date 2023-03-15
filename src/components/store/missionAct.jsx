import { missionActions } from "./missionSlice";

//미션 목록 가져오기
export const fetchMissionData = (authKey) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/missions/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authKey,
        },
      });
      return await response.json();
    };

    try {
      const missionData = await fetchData();
      console.log(`데이터를 가져오는 중!`);
      console.log(missionData);
      dispatch(missionActions.add(missionData));
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

//미션 상세목록 가져오기
export const fetchMissionDetailData = (id, authKey) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8000/missions/${id}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authKey,
        },
      });
      const data = await response.json();
      return data;
    };

    try {
      const missionData = await fetchData();
      console.log(missionData);
      dispatch(missionActions.addDetail(missionData));
    } catch (error) {}
  };
};

//미션 추가하기
export const addMission = (enteredMission, authKey) => {
  return async (dispatch) => {
    const addData = async () => {
      console.log("addData를 실행");
      const response = await fetch("http://localhost:8000/missions/", {
        method: "POST",
        headers: {
          // Authorization: authToken, //백엔드 refresh token 받아온 이후로 적용하기
          "Content-type": "Application/json",
          Authorization: "Bearer " + authKey,
        },
        body: JSON.stringify(enteredMission),
      });
      const data = await response.json();
      console.log("add data의 결과 : ");
      console.log(data);
      return data;
    };

    try {
      const addDataResult = await addData();
      console.log(addDataResult);
      if (addDataResult.title) {
        console.log("add Data가 성공하였으므로 다시 미션을 추가합니다");
        dispatch(missionActions.reAdd(addDataResult));
      }
    } catch (error) {}
  };
};

//미션 수정하기
export const modifyMission = (id, modifiedData, authKey) => {
  return async (dispatch) => {
    const modifyData = async () => {
      const response = await fetch(`http://localhost:8000/missions/${id}/?=`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authKey,
        },
        body: JSON.stringify(modifiedData),
      });
      const data = await response.json();
      console.log(data);
      return data;
    };

    try {
      const responseData = await modifyData();
      if (responseData.title) {
        console.log(
          "미션 수정이 성공하였으므로 수정된 데이터를 업데이트합니다."
        );
        dispatch(
          missionActions.modify({
            id: id,
            title: responseData.title,
            totalCount: responseData.comp_tot,
          })
        );
      }
    } catch (error) {}
  };
};

//미션 삭제하기
export const removeMission = (id, authKey) => {
  return async (dispatch) => {
    const deleteData = async () => {
      const response = await fetch("http://localhost:8000/missions/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authKey,
        },
      });
      const data = await response.json();
      console.log(data);
      return data;
    };

    try {
      const deleted = await deleteData();
      if (deleted.deleted_mission) {
        console.log("미션삭제에 성공했으므로 미션 목록에서 제거합니다");
        dispatch(missionActions.remove(id));
      }
      console.log("id" + id + "is deleted");
    } catch (error) {}
  };
};
