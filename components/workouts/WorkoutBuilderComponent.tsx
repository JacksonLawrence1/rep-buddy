import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

import WorkoutBuilder from "@/services/builders/WorkoutBuilder";
import workoutDatabase from "@/services/storage/WorkoutDatabase";

import DefaultPage from "@/components/pages/DefaultPage";
import Loading from "@/components/primitives/Loading";
import WorkoutBuilderForm from "@/components/workouts/WorkoutBuilderForm";

type WorkoutBuilderComponentProps = {
  id?: number;
};

export default function WorkoutBuilderComponent({
  id,
}: WorkoutBuilderComponentProps) {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<React.ReactNode>(<Loading />);

  // load workout asynchronously
  useEffect(() => {
    if (loading) {
      setLoading(false);

      const builder = new WorkoutBuilder();

      // if no id is passed in, then create a new workout
      if (!id) {
        setContent(<WorkoutBuilderForm workoutBuilder={builder} />);
        return;
      }

      // try to get the workouts from database
      workoutDatabase
        .getWorkout(id)
        .then((workout) => {
          if (workout) {
            builder.setWorkout(workout);
          }

          setContent(<WorkoutBuilderForm workoutBuilder={builder} />);
        })
        .catch((error) => {
          Alert.alert(
            "Not Found",
            `${error}`,
          );

          router.back();
        });
    }
  }, [id, loading]);

  return <DefaultPage title="New Workout">{content}</DefaultPage>;
}
