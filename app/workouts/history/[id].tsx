import WorkoutHistory from "@/components/workouts/history/WorkoutHistory";

import useId from "@/hooks/useId";
import { useModal } from "@/hooks/useModal";

export default function WorkoutHistoryPage() {
  useModal();

  function onInit(id: number) {
    return <WorkoutHistory id={id} />;
  }
  
  // no id given for workout, representing workout from scratch
  return useId(onInit, "Could not find workout, please try restarting the app.")
}
