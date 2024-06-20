import { useNavigation } from "expo-router";

import WorkoutBuilderComponent from "@/components/workouts/WorkoutBuilderComponent";

import { resetState } from "@/hooks/useModal";
import useId from "@/hooks/useId";

export default function NewWorkout() {
  resetState(useNavigation(), ["index", "workouts"]);

  function onInit(id: number) {
    return <WorkoutBuilderComponent id={id} />;
  }
  
  // no id given for workout, representing workout from scratch
  return useId(onInit, "Could not find workout, please try restarting the app.")
}
