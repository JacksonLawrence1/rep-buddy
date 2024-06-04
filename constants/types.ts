import { MuscleGroup } from "./enums/muscleGroups";

export type Exercise = {
  id: string;
  name: string;
  muscleGroups: Set<MuscleGroup>;
};

export type WorkoutSet = { // eventually change to take different types of exercises (i.e. superset, choice)
  exercise: Exercise;
  sets: number;
}

export type WorkoutSetCompressed = {
  id: string; // this points to the exercise
  sets: number;
}

export type Workout = {
  id: string;
  name: string;
  sets: WorkoutSetCompressed[];
}

