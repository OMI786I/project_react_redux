import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    title: null,
    task: null,
  },
];

const TodSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
  },
});
export const { addTask } = TodSlice.actions;
export default TodSlice.reducer;
