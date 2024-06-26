import { useModal } from "@/hooks/useModal";

import historyDatabase from "@/services/database/History";
import exerciseDatabase from "@/services/database/Exercises";
import useHistory from "@/hooks/useHistory";

export default function ExerciseHistory() {
  useModal();

  // creating new functions prevents instance changing from child component state re-renders 
  async function getHistory(id: number) {
    return historyDatabase.getExerciseHistory(id);
  }

  async function getExerciseName(id: number) {
    const exercise = await exerciseDatabase.getExercise(id);
    return { title: exercise.name };
  }

  return useHistory("exercise", "Exercise History", getHistory, getExerciseName);
}
