import { useNavigation } from "expo-router";

import WorkoutBuilderComponent from "@/components/workouts/WorkoutBuilderComponent";

import WorkoutBuilder from "@/services/builders/WorkoutBuilder";
import { resetState } from "@/hooks/useModal";

export default function NewWorkout() {
  // on reload: index -> workouts -> here as navigation state
  resetState(useNavigation(), ["index", "workouts"])

  const workoutBuilder = new WorkoutBuilder();

  // no id given for workout, representing workout from scratch
  return (
    <WorkoutBuilderComponent workoutBuilder={workoutBuilder} />
  );
}
