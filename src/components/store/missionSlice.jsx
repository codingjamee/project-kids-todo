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

export const missionActions = missionSlice.actions;
export default missionSlice.reducer;
