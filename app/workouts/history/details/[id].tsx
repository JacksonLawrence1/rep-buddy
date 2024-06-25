import useHistory from "@/hooks/useHistory";
import { useModal } from "@/hooks/useModal";

import historyDatabase from "@/services/database/History";
import workoutDatabase from "@/services/database/Workouts";

export default function WorkoutHistoryPage() {
  useModal();

  async function getHistory(workout_history_id: number) {
    const history =
      await historyDatabase.getWorkoutExerciseHistory(workout_history_id);

    // HACK: hijack data to display exercise name as the workout name for this page, as by default it shows the workout name
    history.forEach((row) => (row.workoutName = row.exerciseName));
    return history;
  }

  async function getWorkoutTitle(workout_history_id: number) {
    const workout =
      await workoutDatabase.getWorkoutByHistoryId(workout_history_id);
    return workout.name;
  }
  
  return useHistory("exercise", "Workout History", getHistory, getWorkoutTitle);
}
