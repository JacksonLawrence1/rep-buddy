import ExercisePicker from "@/components/exercises/ExercisePicker";
import { Exercise } from "@/constants/types";
import { resetState } from "@/hooks/useModal";
import { router, useNavigation } from "expo-router";
import { MenuProvider } from "react-native-popup-menu";

const callerId: string = "exercisesPage";

// In this route, functions we perform on the exercises are defined here

// what we do once we click save on the exercise
// you can use the exercise parameter if needed
export function onSave(_: Exercise) {
  router.back();
}

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
  // on refresh back buttons still work
  resetState(useNavigation(), ["index"]);

  return (
    <ExercisePicker
      callerId={callerId}
      onAdd={onNewExercise}
      onEdit={onEdit}
    />
  );
}
