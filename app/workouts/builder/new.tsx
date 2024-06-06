import { router, useNavigation } from "expo-router";

import WorkoutBuilderComponent from "@/components/workouts/WorkoutBuilderComponent";

import { Workout } from "@/constants/types";
import { resetState } from "@/hooks/useModal";

// when we want to save a workout
export function onSave(_: Workout) {
  router.navigate("/workouts");
}

// what we do when we want to create a new set for a workout
export function onAddExercise() {
  router.navigate("/workouts/builder/exercises");
}

export default function NewWorkout() {
  resetState(useNavigation(), ["index", "workouts"])

  // no id given for workout, representing workout from scratch
  return (
    <WorkoutBuilderComponent
      onSave={onSave}
      onAddExercise={onAddExercise}
    />
  );
}
