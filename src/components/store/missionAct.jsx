import { missionActions } from "./missionSlice";

export const fetchMissionData = () => {
  return async (dispatch) => {
    const authKey = localStorage.getItem("authKey");
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
      dispatch(missionActions.add(missionData));
    } catch (error) {}
  };
};
