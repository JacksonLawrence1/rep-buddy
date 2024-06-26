import useHistory from "@/hooks/useHistory";
import { useModal } from "@/hooks/useModal";

import historyDatabase from "@/services/database/History";
import workoutDatabase from "@/services/database/Workouts";

export default function WorkoutHistoryPage() {
  useModal();

  async function getHistory(id: number) {
    return historyDatabase.getWorkoutHistory(id);
  }

  async function getWorkoutName(id: number) {
    const workout = await workoutDatabase.getWorkout(id);
    return { title: workout.name };
  }

  return useHistory("workout", "Workout History", getHistory, getWorkoutName);
}
