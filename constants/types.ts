import { MuscleGroup } from "./enums/muscleGroups";

export type weightUnit = "kg" | "lbs";

export type Exercise = {
  id: number;
  name: string;
  muscleGroups: MuscleGroup[];
};

// store full exercise data in this workout set
// helps to cache exercise information in the workout builder
export type WorkoutSet = { // eventually change to take different types of exercises (i.e. superset, choice)
  exercise: Exercise;
  sets: number;
}

// make sure not to store this type in storage, use the compressed version above
export type Workout = {
  id: number;
  name: string;
  sets: WorkoutSet[];
}

export type LogSet = {
  reps: number | null;
  weight: number | null;
}

export type LogExerciseSet = {
  exercise: Exercise;
  sets: LogSet[];
}

export type Log = {
  id: number;
  name: string;
  date: string;
  duration: number;
  sets: LogExerciseSet[];
}
