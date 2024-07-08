import { router, useNavigation } from "expo-router";

import { resetState } from "@/hooks/useModal";

import WorkoutPicker from "@/components/workouts/WorkoutPicker";

export default function Workouts() {
  // navigation state on reload: index -> here
  resetState(useNavigation(), ["index"]);

  function onStartWorkout(id: number) {
    router.navigate({ 
      pathname: "/workouts/view/[id]", 
      params: { id: id } 
    });
  }

  return (
    <WorkoutPicker title="Choose Workout" onPress={onStartWorkout} />
  );
}
