import { router } from "expo-router";
import { Alert } from "react-native";

import useLoading, { SetContentStateAction } from "@/hooks/useLoading";

import ExerciseBuilder from "@/services/builders/ExerciseBuilder";
import exerciseDatabase from "@/services/database/Exercises";

import DefaultPage from "@/components/pages/DefaultPage";
import ExerciseBuilderForm from "@/components/exercises/ExerciseBuilderForm";

interface ExerciseBuilderComponentProps {
  id?: number; // optionally pass in an id to edit an exercise
}

export default function ExerciseBuilderComponent({
  id,
}: ExerciseBuilderComponentProps) {
  const content = useLoading(loadExercise);

  // fetch content asynchronously and show loading spinner (see useLoading.tsx)
  function loadExercise(setContent: SetContentStateAction) {
    const builder = new ExerciseBuilder();
    if (!id) {
      setContent(<ExerciseBuilderForm exercise={builder} />);
      return;
    }

    // try to get the exercise from the database
    exerciseDatabase
      .getExercise(id)
      .then((exercise) => {
        // if found in database, set the exercise in the builder, otherwise edit a new exercise
        if (exercise) {
          builder.setExercise(exercise);
        }

        setContent(<ExerciseBuilderForm exercise={builder} />);
      })
      .catch(() => {
        Alert.alert(
          "Not Found",
          "The exercise chosen could not be found, please try restarting the app.",
        );

        router.back();
      });
  }

  return (
    <DefaultPage
      title={id ? "Editing Exercise" : "New Exercise"}
      theme={"modal"}
    >
      {content}
    </DefaultPage>
  );
}
