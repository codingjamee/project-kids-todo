import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [], point: 0 };

const missionSlice = createSlice({
  name: "mission",
  initialState,
  reducers: {
    add(state, action) {
      state.items = action.payload;
    },
    modify(state, action) {
      if (state.id === action.payload.id) {
        state.map((mission) => (mission.title = action.payload.title));
      }
    },
  },
});

export const sendMissionData = (mission) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://kids-todo-9fa26-default-rtdb.firebaseio.com/kids-todo.json",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mission),
        }
      );

      if (!response.ok) {
        throw new Error("Something goes wrong!");
      }
    };

    try {
      await sendRequest();
    } catch (error) {}
  };
};

export const missionActions = missionSlice.actions;
export default missionSlice.reducer;
