import { router } from "expo-router";

function gotoPage(path: string, id: number) {
  router.navigate({
    pathname: path,
    params: { id: id },
  });
}

export function gotoExerciseHistory(exercise_id: number) {
  gotoPage("/exercises/history/[id]", exercise_id);
}
export function gotoExerciseEdit(exercise_id: number) {
  gotoPage("/exercises/edit/[id]", exercise_id);
}

export function gotoWorkoutHistory(workout_id: number) {
  gotoPage("/workouts/history/all/[id]", workout_id);
}

export function gotoWorkoutHistoryDetails(workout_history_id: number) {
  gotoPage("/workouts/history/details/[id]", workout_history_id);
}

export function gotoWorkoutEdit(workout_id: number) {
  gotoPage("/workouts/edit/[id]", workout_id);
}
