import { useNavigation } from "expo-router";

import { resetState } from "@/hooks/useModal";
import historyDatabase from "@/services/database/History";

import HistoryComponent from "@/components/history/HistoryComponent";
import WorkoutHistoryItem from "@/components/workouts/WorkoutHistoryItem";

// as this route doesn't take an id, we need to slightly change how we render the history
export default function History() {
  // navigation state on reload: index -> here
  resetState(useNavigation(), ["index"]);

  async function getHistory() {
    return historyDatabase.getAllWorkoutHistory();
  }

  async function deleteHistory(id: number) {
    return historyDatabase.deleteExerciseHistory(id);
  }

  return <HistoryComponent 
    title="Your History"
    modal={false}
    id={-1}
    onGetHistory={getHistory}
    onDelete={deleteHistory}
    HistoryListItem={WorkoutHistoryItem}
  />;
}
