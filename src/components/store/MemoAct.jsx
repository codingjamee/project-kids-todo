import { memoActions } from "./memoSlice";

export const fetchMemoData = (authKey) => {
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
      console.log(memoData);
    } catch (error) {}
  };
};

export const addMemoData = (enteredMemo, authKey) => {
  return async (dispatch) => {
    const addData = async () => {
      const response = await fetch("http://localhost:8000/board", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authKey,
        },
        body: JSON.stringify(enteredMemo),
      });
      const data = await response.json();
      return data;
    };

    try {
      await addData();
      dispatch(memoActions.add(enteredMemo));
    } catch (error) {}
  };
};
