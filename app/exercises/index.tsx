import ExercisePicker from "@/components/exercises/ExercisePicker";
import { Exercise } from "@/constants/types";
import { resetState } from "@/hooks/useModal";
import { router, useNavigation } from "expo-router";

// In this route, functions we perform on the exercises are defined here

// what we do when we want to create a new exercise
export function onNewExercise() {
  router.navigate("/exercises/builder/new");
}

// what we do when we want to edit an exercise
export function onEdit(exercise: Exercise) {
  router.navigate({
    pathname: "/exercises/builder/[id]",
    params: { id: exercise.id },
  });
}

export default function Exercises() {
  // navigation state on reload: index -> here
  resetState(useNavigation(), ["index"]);

  return (
    <ExercisePicker
      onAdd={onNewExercise}
      onEdit={onEdit}
    />
  );
}
