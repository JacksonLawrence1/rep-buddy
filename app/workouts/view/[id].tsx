import useId from "@/hooks/useId";

import WorkoutViewer from "@/components/workouts/WorkoutViewer";
import { AlertContextProps } from "@/components/primitives/Alert";

export default function ViewWorkout() {
  function onInit(id: number) {
    return <WorkoutViewer workout_id={id} alertSettings={alertSettings} />
  }

  const alertSettings: AlertContextProps = {
    enabled: true,
    title: "Start this Workout?",
    description: "You can only have one workout in progress at a time. Any workouts currently in progress will be overwritten. Are you sure you want to start this workout?",
    cancelText: "Cancel",
    submitText: "Start",
  };

  return useId(onInit, "Could not find workout, please try restarting the app.");
}
