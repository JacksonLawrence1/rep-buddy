import useHistory, { HistoryType } from "@/hooks/useHistory";
import { useModal } from "@/hooks/useModal";

export default function WorkoutHistoryPage() {
  useModal();

  const historySettings = {
    type: HistoryType.Workouts,
    pageTitle: "Workout History",
    modal: true,
    title: true,
    itemTitle: false,
    itemDate: true,
  }

  return useHistory(historySettings);
}
