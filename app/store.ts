import { configureStore } from "@reduxjs/toolkit";

import exercises from "@/features/exercises/Exercises";

export default configureStore({
  reducer: {
    exercises: exercises,
  },
});
