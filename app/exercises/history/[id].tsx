import { useModal } from "@/hooks/useModal";

import useId from "@/hooks/useId";
import HistoryList from "@/components/history/HistoryList";
import historyDatabase from "@/services/database/History";
import ExerciseHistoryItem from "@/components/exercises/ExerciseHistoryItem";

export default function ExerciseHistory() {
  useModal();

  function onInit(id: number) {
    return (
      <HistoryList
        id={id}
        onGetHistory={historyDatabase.getExerciseHistory.bind(historyDatabase)}
        onDelete={historyDatabase.deleteExerciseHistory.bind(historyDatabase)}
        HistoryRenderer={ExerciseHistoryItem}
      />
    );
  }

  return useId(
    onInit,
    "Could not find exercise, please try restarting the app.",
  );
}
