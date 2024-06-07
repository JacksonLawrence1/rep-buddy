import { MuscleGroup } from "./enums/muscleGroups";

export type Exercise = {
  id: string;
  name: string;
  muscleGroups: Set<MuscleGroup>;
};

export type WorkoutSet = {
  id: string; // this points to the exercise
  sets: number;
}

export type Workout = {
  id: string;
  name: string;
  sets: WorkoutSet[];
}

// store full exercise data in this workout set
// helps to cache exercise information in the workout builder
export type WorkoutSetUncompressed = { // eventually change to take different types of exercises (i.e. superset, choice)
  exercise: Exercise;
  sets: number;
}

// make sure not to store this type in storage, use the compressed version above
export type WorkoutUncompressed = {
  id: string;
  name: string;
  sets: WorkoutSetUncompressed[];
}

export type WorkoutLogSet = {
  reps: number | null;
  weight: number | null;
}

export type WorkoutLogSetComplete = {
  reps: number;
  weight: number;
}

export type WorkoutLogExerciseUncompressed = {
  exercise: Exercise;
  sets: WorkoutLogSet[];
  isComplete: boolean;
}

export type WorkoutLogExercise = {
  exerciseId: string; // need to consider what happens if the exercise is deleted
  sets: WorkoutLogSetComplete[];
}

export type WorkoutLog = {
  id: string;
  date: string;
  duration: number;
  sets: WorkoutLogExercise[];
}
