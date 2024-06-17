import { configureStore } from "@reduxjs/toolkit";

import exercises from "@/features/exercises";
import workouts from "@/features/workouts";
import log from "@/features/log";

export default configureStore({
  reducer: {
    exercises: exercises,
    workouts: workouts,
    log: log,
  },
});
