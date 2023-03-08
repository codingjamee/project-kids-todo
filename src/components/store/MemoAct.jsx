import { memoActions } from "./memoSlice";

export const fetchMemoData = () => {
  const authKey = localStorage.getItem("authKey");

  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/board", {
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
      const memoData = await fetchData();
      dispatch(memoActions.add(memoData));
    } catch (error) {}
  };
};
