import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

import ExerciseBuilder from "@/services/builders/ExerciseBuilder";
import exerciseDatabase from "@/services/storage/ExerciseDatabase";

import DefaultPage from "@/components/pages/DefaultPage";
import Loading from "@/components/primitives/Loading";
import ExerciseBuilderForm from "@/components/exercises/ExerciseBuilderForm";

interface ExerciseBuilderComponentProps {
  id?: number; // optionally pass in an id to edit an exercise
}

export default function ExerciseBuilderComponent({
  id,
}: ExerciseBuilderComponentProps) {
  const [loading, setLoading] = useState(true);

  // render loading or the exercise builder form
  const [content, setContent] = useState<React.ReactNode>(<Loading />);

  // load exercise (if id passed) asynchronously
  useEffect(() => {
    if (loading) {
      setLoading(false);

      const builder = new ExerciseBuilder();

      // if no id is passed in, then create a new exercise
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
  }, [id, loading]);

  return (
    <DefaultPage
      title={id ? "Editing Exercise" : "New Exercise"}
      theme={"modal"}
    >
      {content}
    </DefaultPage>
  );
}
