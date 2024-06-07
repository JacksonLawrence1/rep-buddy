import { useLocalSearchParams, useNavigation } from "expo-router";

import WorkoutBuilderComponent from "@/components/workouts/WorkoutBuilderComponent";
import WorkoutBuilder from "@/services/builders/WorkoutBuilder";

import { resetState } from "@/hooks/useModal";

export default function NewWorkout() {
  resetState(useNavigation(), ["index", "workouts"]);

  // include id, as opposed to new
  const { id } = useLocalSearchParams<{ id: string }>();

  const workoutBuilder = new WorkoutBuilder(id);

  // no id given for workout, representing workout from scratch
  return <WorkoutBuilderComponent workoutBuilder={workoutBuilder} />;
}
