import { router, useLocalSearchParams, useNavigation } from "expo-router";

import WorkoutBuilderComponent from "@/components/workouts/WorkoutBuilderComponent";

import { resetState } from "@/hooks/useModal";

export default function NewWorkout() {
  resetState(useNavigation(), ["index", "workouts"]);

  // include id, as opposed to new
  const { id } = useLocalSearchParams<{ id: string }>();

  if (id === undefined || id === "" || isNaN(parseInt(id))) {
    // if somehow the id is not a number, then route it as a new exercise
    router.replace("/workouts/builder/new");
    return;
  }
  
  // no id given for workout, representing workout from scratch
  return <WorkoutBuilderComponent id={+id} />;
}
