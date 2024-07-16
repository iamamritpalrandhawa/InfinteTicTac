// src/Store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./GameSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
