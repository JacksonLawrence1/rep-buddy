import ExerciseBuilderComponent from "@/components/exercises/ExerciseBuilder";
import { useLocalSearchParams } from "expo-router";

import { onBack, onSave } from "./index";

export default function ExerciseBuilderNoID() {
  const { id } = useLocalSearchParams<{id: string}>();

  return <ExerciseBuilderComponent id={id} onSave={onSave} onBack={onBack} />;
}

