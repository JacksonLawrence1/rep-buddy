import ExerciseBuilderComponent from "@/components/exercises/ExerciseBuilderComponent";

import { onSave } from "../index";
import { useModal } from "@/hooks/useModal";

export default function NewExercise() {
  // on reload, go back to home screen
  useModal();

  return <ExerciseBuilderComponent onSave={onSave} />;
}
