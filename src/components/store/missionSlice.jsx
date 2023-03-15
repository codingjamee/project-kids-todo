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
    //수정을 하면 목록의 일부가 변경되는 것이므로 redux의 state가 변경되는 것을
    //react가 인식하지 못한다.
    //변경한 것을 인식하게 하려면?
    modify(state, action) {
      console.log("아이템 목록 수정을 시작합니다.");
      const modifiedItemN = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const copiedArray = [...state.items]; //item배열 복사

      const modifiedItem = {
        ...copiedArray[modifiedItemN],
        title: action.payload.title,
        comp_tot: action.payload.totalCount,
      };
      console.log("수정될 배열을 선택했습니다.");

      if (modifiedItemN !== -1) {
        console.log("복사된 배열의 아이템 목록 수정을 시작합니다.");
        state.items.splice(modifiedItemN, 1, modifiedItem);
        console.log("복사된 배열의 아이템 목록을 수정했습니다.");
      } else {
        console.log("수정할 아이템이 존재하지 않습니다.");
      }
      console.log(copiedArray);
      state.items = copiedArray;
      console.log("아이템 목록 수정을 완료합니다.");
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
