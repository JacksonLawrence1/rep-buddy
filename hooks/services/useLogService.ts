import { useState } from "react";

import WorkoutLogBuilder from "@/services/builders/WorkoutLogBuilder";
import { WorkoutLogExerciseUncompressed } from "@/constants/types";


export const useLogService = (workoutLog: WorkoutLogBuilder) => {
  const [workoutExerciseSets, setWorkoutExerciseSets] = useState<WorkoutLogExerciseUncompressed[]>(
    workoutLog.sets,
  );

  // whenever the workout log changes, update the state
  // updates to ui, shouldn't cause re-renders
  workoutLog.subscribe(() => {
    setWorkoutExerciseSets(workoutLog.sets);
  });
  
  return workoutExerciseSets;
};
