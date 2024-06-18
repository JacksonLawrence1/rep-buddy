import { router, useLocalSearchParams } from "expo-router";

import ExerciseBuilderComponent from "@/components/exercises/ExerciseBuilderComponent";

import { useModal } from "@/hooks/useModal";

export default function EditExerciseWithId() {
  useModal();

  const { id } = useLocalSearchParams<{id: string}>();

  if (id === undefined || id === "" || isNaN(parseInt(id))) {
    // if somehow the id is not a number, then route it as a new exercise
    router.replace("/exercises/builder/new");
    return;
  }

  return (
    <ExerciseBuilderComponent id={+id} />
  )
}

