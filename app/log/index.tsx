import { router, useNavigation } from "expo-router";

import { resetState } from "@/hooks/useModal";

import WorkoutPicker from "@/components/workouts/WorkoutPicker";

export default function Workouts() {
  // navigation state on reload: index -> here
  resetState(useNavigation(), ["index"]);

  function onStartWorkout(id: number) {
    // TODO: navigate to workout screen
    // add alert to confirm starting workout
    
    router.navigate({ 
      pathname: "/log/[id]", 
      params: { id: id } 
    });
  }

  return (
    <WorkoutPicker title="Choose Workout" onPress={onStartWorkout} />
  );
}
