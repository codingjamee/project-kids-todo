import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [], detailItem: {}, missionIsChanged: false };

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
    remove(state, action) {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    addDetail(state, action) {
      state.detailItem = action.payload;
    },
    reAdd(state, action) {
      console.log("추가된 미션목록을 반영합니다!");
      state.items.push(action.payload);
    },
  },
});

export const missionActions = missionSlice.actions;
export default missionSlice.reducer;
