
import HistoryList from "@/components/history/HistoryList";
import WorkoutHistoryItem from "@/components/workouts/WorkoutHistoryItem";
import useId from "@/hooks/useId";
import { useModal } from "@/hooks/useModal";

import historyDatabase from "@/services/database/History";

export default function WorkoutHistoryPage() {
  useModal();

  function onInit(id: number) {
    return <HistoryList 
      id={id}
      onGetHistory={historyDatabase.getWorkoutHistory.bind(historyDatabase)}
      onDelete={historyDatabase.deleteWorkoutHistory.bind(historyDatabase)}
      HistoryRenderer={WorkoutHistoryItem}
    />;
  }
  
  // no id given for workout, representing workout from scratch
  return useId(onInit, "Could not find workout, please try restarting the app.")
}
