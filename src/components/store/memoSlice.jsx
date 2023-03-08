import { createSlice } from "@reduxjs/toolkit";

const initialState = { memos: [], detailItem: {} };

const memoSlice = createSlice({
  name: "memo",
  initialState,
  reducers: {
    add(state, action) {
      state.memos = action.payload;
    },
    modify(state, action) {},
  },
});

export const memoActions = memoSlice.actions;
export default memoSlice.reducer;
