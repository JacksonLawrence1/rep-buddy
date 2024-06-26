import useId from "@/hooks/useId";

import historyDatabase from "@/services/database/History";

import HistoryComponent, { HistoryDetails } from "@/components/history/HistoryComponent";
import WorkoutHistoryItem from "@/components/workouts/WorkoutHistoryItem";
import ExerciseHistoryItem from "@/components/exercises/ExerciseHistoryItem";

type listType = "workout" | "exercise";
type HistoryCallback = (id: number) => Promise<any>;
type DetailsCallback = (id: number) => Promise<HistoryDetails>;

export default function useHistory(type: listType, title: string, onGetHistory: HistoryCallback, onGetDetails: DetailsCallback) {
  async function deleteExerciseHistory(exercise_id: number) {
    return historyDatabase.deleteExerciseHistory(exercise_id);
  }

  async function deleteWorkoutHistory(id: number) {
    return historyDatabase.deleteWorkoutHistory(id);
  }

  function onInit(id: number) {
    const props = { title, id, onGetHistory, onGetDetails };

    // render respective history list based on type
    if (type === "workout") {
      return <HistoryComponent
        {...props}
        onDelete={deleteWorkoutHistory}
        HistoryListItem={WorkoutHistoryItem}
      />;
    }

    return <HistoryComponent
      {...props}
      onDelete={deleteExerciseHistory}
      HistoryListItem={ExerciseHistoryItem}
    />;
  }
  
  // no id given for workout, representing workout from scratch
  return useId(onInit, "Could not get your history, please try restarting the app.")
}
