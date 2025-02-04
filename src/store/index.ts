import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "./boards/boardSlice";
import tasksReducer from "./tasks/taskSlice";

const persistanceMiddleware = (store) => (next) => (action) => {
 next(action);
 localStorage.setItem("boards", JSON.stringify(store.getState())); 
};
const persistanceMiddlewareTasks = (store) => (next) => (action) => {
 next(action);
 localStorage.setItem("tasks", JSON.stringify(store.getState())); 
};

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
    tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistanceMiddleware, persistanceMiddlewareTasks),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

