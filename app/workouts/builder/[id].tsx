import { useLocalSearchParams, useNavigation } from "expo-router";

import WorkoutBuilderComponent from "@/components/workouts/WorkoutBuilderComponent";

import { onSave, onAddExercise } from "./new";
import { resetState } from "@/hooks/useModal";

export default function NewWorkout() {
  // include id, as opposed to new
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  resetState(useNavigation(), ["index", "workouts"])

  // no id given for workout, representing workout from scratch
  return (
    <WorkoutBuilderComponent
      id={id}
      onSave={onSave}
      onAddExercise={onAddExercise}
    />
  );
}
