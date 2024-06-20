import ExerciseBuilderComponent from "@/components/exercises/ExerciseBuilderComponent";

import { useModal } from "@/hooks/useModal";
import useId from "@/hooks/useId";

export default function EditExerciseWithId() {
  useModal();

  function onInit(id: number) {
    return <ExerciseBuilderComponent id={id} />
  }

  return useId(onInit, "Could not find exercise, please try restarting the app.");
}

