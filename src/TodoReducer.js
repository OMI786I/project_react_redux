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
  reducers: {},
});

export default TodSlice.reducer;
