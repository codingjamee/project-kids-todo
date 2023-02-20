import { missionActions } from "./missionSlice";

//미션 목록 가져오기
export const fetchMissionData = () => {
  const authKey = localStorage.getItem("authKey");

  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/missions/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authKey,
        },
      });
      const data = await response.json();
      return data;
    };

    try {
      const missionData = await fetchData();
      console.log(missionData);
      dispatch(missionActions.add(missionData));
    } catch (error) {}
  };
};

//미션 상세목록 가져오기
export const fetchMissionDetailData = (id) => {
  const authKey = localStorage.getItem("authKey");

  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8000/missions/${id}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authKey,
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

//미션 삭제하기
export const removeMission = (id) => {
  const authKey = localStorage.getItem("authKey");

  return async (dispatch) => {
    const deleteData = async () => {
      const response = await fetch("http://localhost:8000/missions/" + id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: authKey,
        },
      });
      const data = await response.json();
      return data;
    };

    try {
      await deleteData();
      dispatch(missionActions.remove(id));
      console.log("id" + id + "is deleted");
    } catch (error) {}
  };
};

//미션 수정하기
export const modifyMission = (id, modifiedData) => {
  const authKey = localStorage.getItem("authKey");

  return async (dispatch) => {
    const modifyData = async () => {
      const response = await fetch(`http://localhost:8000/missions/${id}/?=`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authKey,
        },
        body: JSON.stringify(modifiedData),
      });
      const data = await response.json();
      console.log(data);
      return data;
    };

    try {
      const responseData = await modifyData();
      dispatch(
        missionActions.modify({
          id: id,
          title: responseData.title,
          totalCount: responseData.comp_tot,
        })
      );
    } catch (error) {}
  };
};

export const addMission = (enteredMission) => {
  const authKey = localStorage.getItem("authKey");

  return async (dispatch) => {
    const addData = async () => {
      const response = await fetch("http://localhost:8000/missions/", {
        method: "POST",
        headers: {
          // Authorization: authToken, //백엔드 refresh token 받아온 이후로 적용하기
          "Content-type": "Application/json",
          Authorization: authKey,
        },
        body: JSON.stringify(enteredMission),
      });
      const data = await response.data();
      return data;
    };

    try {
      await addData();
      dispatch(missionActions.add(enteredMission));
    } catch (error) {}
  };
};
