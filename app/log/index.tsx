import { router, useNavigation } from "expo-router";

import { resetState } from "@/hooks/useModal";

import WorkoutPicker from "@/components/workouts/WorkoutPicker";
import { AlertContextProps } from "@/components/primitives/Alert";

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

  const alertSettings: AlertContextProps = {
    enabled: true,
    description: "Are you sure you want to start this workout? You can only have one workout in progress at a time.",
    cancelText: "Cancel",
    submitText: "Start Workout",
  };

  return (
    <WorkoutPicker title="Choose Workout" onPress={onStartWorkout} alertSettings={alertSettings} />
  );
}
