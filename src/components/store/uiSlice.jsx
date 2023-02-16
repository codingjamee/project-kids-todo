import { createSlice } from "@reduxjs/toolkit";

const initialUiState = {
  showMissionDetail: false,
  showModify: false,
  notification: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUiState,
  reducers: {
    toggle(state) {
      state.showMissionDetail = !state.showMissionDetail;
    },
    toggleModify(state) {
      state.showModify = !state.showModify;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const uiSliceActions = uiSlice.actions;
export default uiSlice.reducer;
