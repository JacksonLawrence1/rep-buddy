import { useState } from "react";

import WorkoutBuilder from "@/services/builders/WorkoutBuilder";
import { WorkoutSetUncompressed } from "@/constants/types";


export const useWorkoutBuilder = (workoutBuilder: WorkoutBuilder) => {
  const [workoutSets, setWorkoutSets] = useState<WorkoutSetUncompressed[]>(
    workoutBuilder.workout.sets,
  );

  // swap/add exercises
  workoutBuilder.subscribe(() => {
    setWorkoutSets(workoutBuilder.workout.sets);
  });
  
  return workoutSets;
};
