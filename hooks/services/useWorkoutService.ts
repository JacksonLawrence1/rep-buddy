import { useState } from "react";

import workoutService from "@/services/storage/WorkoutService";

export const useWorkoutService = () => {
  const [workouts, setWorkouts] = useState(workoutService.dataAsArray);

  workoutService.subscribe(() => {
    setWorkouts(workoutService.dataAsArray);
  });

  return workouts;
}
