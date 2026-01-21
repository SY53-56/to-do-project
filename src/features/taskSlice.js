import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  task: JSON.parse(localStorage.getItem("task")) || [],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask(state, action) {
      state.task.push({
        id: nanoid(),
        ...action.payload,
        status: "todo",
        isCompleted: false,
       
      });

      localStorage.setItem("task", JSON.stringify(state.task));
    },

    toggleTask(state, action) {
      const task = state.task.find((t) => t.id === action.payload);
      if (task) {
        task.isCompleted = !task.isCompleted;
        localStorage.setItem("task", JSON.stringify(state.task));
      }
    },
    updateTaskStatus(state, action) {
      const { id, status } = action.payload;
      const task = state.task.find((t) => t.id === id);

      if (task) {
        task.status = status;
        localStorage.setItem("task", JSON.stringify(state.task));
      }
    },
    updateTask(state,action) {
  state.task = state.task.map(task=> task.id === action.payload.id ? {  ...task,...action.payload}:task)
    localStorage.setItem("task", JSON.stringify(state.task)); 
    },

    removeTask(state, action) {
      state.task = state.task.filter((task) => task.id !== action.payload);
      localStorage.removeItem("task")
    },
  },
});

export const {
  addTask,
  removeTask,
  updateTaskStatus,
  toggleTask,
  updateTask
} = taskSlice.actions;

export default taskSlice.reducer;
