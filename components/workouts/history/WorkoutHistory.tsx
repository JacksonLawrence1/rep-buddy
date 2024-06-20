import { router } from "expo-router";
import { Alert } from "react-native";

import useLoading, { SetContentStateAction } from "@/hooks/useLoading";

import DefaultPage from "@/components/pages/DefaultPage";

import historyDatabase from "@/services/database/History";
import WorkoutHistoryList from "./WorkoutHistoryList";

interface WorkoutHistoryProps {
  id: number; // id of the workout to get history for
}

export default function WorkoutHistory({
  id,
}: WorkoutHistoryProps) {
  const content = useLoading(loadWorkoutHistory);

  function loadWorkoutHistory(setContent: SetContentStateAction) {

    // get all history for a single exercise
    historyDatabase
      .getWorkoutHistoryForWorkout(id)
      .then((history) => {
        // if found in database, set the exercise in the builder, otherwise edit a new exercise

        setContent(<WorkoutHistoryList workoutHistory={history} />);
      })
      .catch(() => {
        Alert.alert(
          "Error",
          "There was an error loading the exercise history. Please try restarting the app.",
        );

        router.back();
      });
  }

  return (
    <DefaultPage
      title="Workout History"
      theme={"modal"}
    >
      {content}
    </DefaultPage>
  );
}
