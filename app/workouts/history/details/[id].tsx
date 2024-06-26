import useHistory from "@/hooks/useHistory";
import { useModal } from "@/hooks/useModal";

import historyDatabase from "@/services/database/History";
import workoutDatabase from "@/services/database/Workouts";

export default function WorkoutHistoryPage() {
  useModal();

  async function getHistory(workout_history_id: number) {
    const history =
      await historyDatabase.getWorkoutExerciseHistory(workout_history_id);

    // HACK: hijack data so details we want are displayed
    history.forEach((row) => {
      row.workoutName = row.exerciseName;
      row.date = "";
    });
    return history;
  }

  async function getWorkoutTitle(workout_history_id: number) {
    const workout =
      await workoutDatabase.getWorkoutByHistoryId(workout_history_id);

    const details = await historyDatabase.getWorkoutHistoryDetails(workout_history_id);

    return { title: workout.name, date: details.date };
  }
  
  return useHistory("exercise", "Workout History", getHistory, getWorkoutTitle);
}
