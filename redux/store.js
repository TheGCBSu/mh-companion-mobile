import { configureStore } from "@reduxjs/toolkit";
import monstersReducer from "./monstersSlice";

export const store = configureStore({
  reducer: {
    monsters: monstersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // disables that warning
    }),
});
