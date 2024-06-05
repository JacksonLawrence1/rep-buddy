import ExercisePicker from "@/components/exercises/ExercisePicker";
import { Exercise } from "@/constants/types";
import { router } from "expo-router";

// In this route, functions we perform on the exercises are defined here

// what we do once we click save on the exercise
// you can use the exercise parameter if needed
export function onSave(_: Exercise) {
  router.navigate("/exercises");
}

// on create exercise page, what we do when we click back
export function onBack() {
  router.navigate("/exercises");
}

// what we do when we want to create a new exercise
export function onNewExercise() {
  router.navigate("/exercises/exerciseBuilder");
}

// what we do when we want to edit an exercise
export function onEdit(exercise: Exercise) {
  router.navigate({ pathname: "/exercises/[id]", params: { id: exercise.id } });
}

const callerId: string = "exercisesPage";

export default function ExerciseList() {
  return <ExercisePicker callerId={callerId} onAdd={onNewExercise} onEdit={onEdit} onBack={() => router.dismissAll()} />;
}
