import { useModal } from "@/hooks/useModal";

import useHistory, { HistoryType } from "@/hooks/useHistory";

export default function ExerciseHistory() {
  useModal();

  const historySettings = {
    type: HistoryType.Exercise,
    pageTitle: "Exercise History",
    modal: true,
    title: true,
    itemTitle: true,
    swapTitle: true,
    itemDate: true,
  }

  return useHistory(historySettings);
}
