import { router } from "expo-router";
import { Alert } from "react-native";

import useLoading, { SetContentStateAction } from "@/hooks/useLoading";

import DefaultPage from "@/components/pages/DefaultPage";

import historyDatabase from "@/services/database/History";
import ExerciseHistoryList from "./ExerciseHistoryList";

interface ExerciseHistoryProps {
  id: number; // id of the exercise to get history for
}

export default function ExerciseHistory({
  id,
}: ExerciseHistoryProps) {
  const content = useLoading(loadExerciseHistory);

  function loadExerciseHistory(setContent: SetContentStateAction) {
    // get all history for a single exercise
    historyDatabase
      .getExerciseHistory(id)
      .then((history) => {
        // if found in database, set the exercise in the builder, otherwise edit a new exercise

        setContent(<ExerciseHistoryList exerciseHistory={history} />);
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
      title="Exercise History"
      theme={"modal"}
    >
      {content}
    </DefaultPage>
  );
}
