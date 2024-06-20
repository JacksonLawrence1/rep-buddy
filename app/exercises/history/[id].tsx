import { useModal } from "@/hooks/useModal";

import useId from "@/hooks/useId";

import ExerciseHistoryComponent from "@/components/exercises/history/ExerciseHistory";

export default function ExerciseHistory() {
  useModal();

  function onInit(id: number) {
    return <ExerciseHistoryComponent id={id} />
  }

  return useId(onInit, "Could not find exercise, please try restarting the app.");
}

