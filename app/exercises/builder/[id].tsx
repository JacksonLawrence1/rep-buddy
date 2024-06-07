import { useLocalSearchParams } from "expo-router";

import ExerciseBuilderComponent from "@/components/exercises/ExerciseBuilderComponent";

import { onSave } from "../index";
import { useModal } from "@/hooks/useModal";

export default function EditExerciseWithId() {
  useModal();

  const { id } = useLocalSearchParams<{id: string}>();

  return <ExerciseBuilderComponent id={id} onSave={onSave} />;
}

