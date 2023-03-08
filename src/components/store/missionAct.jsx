import { useSelector } from "react-redux";
import { authActions } from "./authSlice";
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
      const response = await fetch("http://localhost:8000/missions/", {
        method: "POST",
        headers: {
          // Authorization: authToken, //백엔드 refresh token 받아온 이후로 적용하기
          "Content-type": "Application/json",
          Authorization: "Bearer " + authKey,
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
      return data;
    };

    try {
      await deleteData();
      dispatch(missionActions.remove(id));
      console.log("id" + id + "is deleted");
    } catch (error) {}
  };
};

//access token가져오기
export const getToken = (authKey) => {
  return async (dispatch) => {
    const getAccessToken = async () => {
      const response = await fetch("http://localhost:8000/refresh-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authKey,
        },
      });
      const data = await response.json();
      return data;
    };
    try {
      const fetchedAccess = await getAccessToken();
      console.log(fetchedAccess);
      dispatch(authActions.setToken(fetchedAccess.access_token));
    } catch (error) {}
  };
};
