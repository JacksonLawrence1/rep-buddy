import { router, useNavigation } from "expo-router";

import DefaultPage from "@/components/pages/DefaultPage";
import Searchbar from "@/components/inputs/Searchbar";
import WorkoutList from "@/components/workouts/WorkoutList";
import Button from "@/components/buttons/Button";

import { Workout } from "@/constants/types";
import { resetState } from "@/hooks/useModal";

const callerId: string = "workouts";

export default function Workouts() {
  resetState(useNavigation(), ["index"]);

  function onNewWorkout() {
    router.navigate("/workouts/builder/new");
  }

  function onEdit(workout: Workout) {
    router.navigate({
      pathname: "/workouts/builder/[id]",
      params: { id: workout.id },
    });
  }

  return (
    <DefaultPage title="Your Workouts">
      <Searchbar placeholder="Search for an exercise" />
      <WorkoutList callerId={callerId} onEdit={onEdit} />
      <Button
        label="Create Workout"
        theme="primary"
        icon={"plus"}
        onPress={onNewWorkout}
      />
    </DefaultPage>
  );
}
