import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [], detailItem: {} };

const missionSlice = createSlice({
  name: "mission",
  initialState,
  reducers: {
    add(state, action) {
      if (action.payload.message !== "Could not validate credentials") {
        console.log("미션목록을 추가합니다!");
        state.items = action.payload;
      } else {
        console.log("미션목록 가져오기 실패!");
      }
    },
    modify(state, action) {
      if (state.items.id === action.payload.id) {
        state.items.title = action.payload.title;
        state.items.comp_tot = action.payload.totalCount;
      }
    },
    remove(state, action) {
      state.items.filter(state.items.id !== action.id);
    },
    addDetail(state, action) {
      state.detailItem = action.payload;
    },
  },
});

export const missionActions = missionSlice.actions;
export default missionSlice.reducer;
