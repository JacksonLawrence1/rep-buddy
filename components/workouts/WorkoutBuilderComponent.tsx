import { router } from "expo-router";
import { Alert } from "react-native";

import useLoading, { SetContentStateAction } from "@/hooks/useLoading";

import WorkoutBuilder from "@/services/builders/WorkoutBuilder";
import workoutDatabase from "@/services/storage/WorkoutDatabase";

import DefaultPage from "@/components/pages/DefaultPage";
import WorkoutBuilderForm from "@/components/workouts/WorkoutBuilderForm";

type WorkoutBuilderComponentProps = {
  id?: number;
};

export default function WorkoutBuilderComponent({
  id,
}: WorkoutBuilderComponentProps) {
  const content = useLoading(loadWorkout);

  function loadWorkout(setContent: SetContentStateAction): void {
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
        Alert.alert("Not Found", `${error}`);

        router.back();
      });
  }

  return <DefaultPage title="New Workout">{content}</DefaultPage>;
}
