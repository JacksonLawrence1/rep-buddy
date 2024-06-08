import { useState } from "react";

import LogBuilder from "@/services/builders/LogBuilder";
import { LogExerciseSet } from "@/constants/types";



export const useLogService = (workoutLog: LogBuilder) => {
  const [workoutExerciseSets, setWorkoutExerciseSets] = useState<LogExerciseSet[]>(
    workoutLog.sets,
  );

  // whenever the workout log changes, update the state
  // updates to ui, shouldn't cause re-renders
  workoutLog.subscribe(() => {
    setWorkoutExerciseSets([ ...workoutLog.sets ]);
  });
  
  return workoutExerciseSets;
};
