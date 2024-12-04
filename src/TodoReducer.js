import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const TodSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    updateTask: (state, action) => {
      const { id, title, task } = action.payload;
      const uu = state.find((task) => task.id == id);
      if (uu) {
        uu.title = title;
        uu.task = task;
      }
    },
    deleteTask: (state, action) => {
      const { id } = action.payload;
      const uu = state.find((task) => task.id === id);
      if (uu) {
        return state.filter((f) => f.id !== id);
      }
    },
  },
});
export const { addTask, updateTask, deleteTask } = TodSlice.actions;
export default TodSlice.reducer;
