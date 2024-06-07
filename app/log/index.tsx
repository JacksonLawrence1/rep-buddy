import { router, useNavigation } from "expo-router";

import WorkoutPicker from "@/components/workouts/WorkoutPicker";

import { resetState } from "@/hooks/useModal";
import { Workout } from "@/constants/types";

export default function Workouts() {
  // navigation state on reload: index -> here
  resetState(useNavigation(), ["index"]);

  function onStartWorkout(workout: Workout) {
    // TODO: navigate to workout screen
    // add alert to confirm starting workout
    
    router.navigate({ 
      pathname: "/log/start/[id]", 
      params: { id: workout.id } 
    });
  }

  return (
    <WorkoutPicker title="Choose Workout" onPress={onStartWorkout} />
  );
}
