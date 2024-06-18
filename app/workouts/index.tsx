import { router, useNavigation } from "expo-router";

import { resetState } from "@/hooks/useModal";

import WorkoutPicker from "@/components/workouts/WorkoutPicker";

export default function Workouts() {
  // navigation state on reload: index -> here
  resetState(useNavigation(), ["index"]);

  function onNewWorkout() {
    router.navigate("/workouts/builder/new");
  }

  function onEdit(id: number) {
    router.navigate({
      pathname: "/workouts/builder/[id]",
      params: { id: id },
    });
  }

  return (
    <WorkoutPicker onEdit={onEdit} onAdd={onNewWorkout} />
  );
}
