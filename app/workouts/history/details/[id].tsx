import useHistory, { HistoryType } from "@/hooks/useHistory";
import { useModal } from "@/hooks/useModal";

export default function WorkoutHistoryPage() {
  useModal();

  const historySettings = {
    type: HistoryType.Workout,
    pageTitle: "Workout History",
    modal: true,
    title: true,
    date: true,
    itemTitle: true,
  }

  return useHistory(historySettings);
}
