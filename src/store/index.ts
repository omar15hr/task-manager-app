import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "./boards/boardSlice";

const persistanceMiddleware = (store) => (next) => (action) => {
 next(action);
 localStorage.setItem("boards", JSON.stringify(store.getState())); 
};

export const store = configureStore({
  reducer: {
    boards: boardsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistanceMiddleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

