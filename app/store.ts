import { configureStore } from "@reduxjs/toolkit";

import exercises from "@/features/exercises";
import workouts from "@/features/workouts";
import log from "@/features/log";

const store = configureStore({
  reducer: {
    exercises: exercises,
    workouts: workouts,
    log: log,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
