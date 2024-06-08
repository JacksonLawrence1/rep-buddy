import { MuscleGroup } from "./enums/muscleGroups";

export type weightUnit = "kg" | "lbs";

export type Exercise = {
  id: string;
  name: string;
  muscleGroups: Set<MuscleGroup>;
};

// store full exercise data in this workout set
// helps to cache exercise information in the workout builder
export type WorkoutSet = { // eventually change to take different types of exercises (i.e. superset, choice)
  exercise: Exercise;
  sets: number;
}

// make sure not to store this type in storage, use the compressed version above
export type Workout = {
  id: string;
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
  isComplete: boolean;
}

export type Log = {
  id: string;
  date: string;
  duration: number;
  sets: LogExerciseSetCompressed[];
}

export type WorkoutSetCompressed = {
  id: string; // this points to the exercise
  sets: number;
}

export type WorkoutCompressed = {
  id: string;
  name: string;
  sets: WorkoutSetCompressed[];
}

export type LogExerciseSetCompressed = {
  exerciseId: string; // need to consider what happens if the exercise is deleted
  sets: LogSet[];
}

