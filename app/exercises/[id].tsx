// Dynamic route for editing exercises using their id

import { useLocalSearchParams } from "expo-router";
import ExerciseBuilder from "./exerciseBuilder";

import { parseId } from "@/constants/storage/utils";

export default function ExercisePage() {
  const { id } = useLocalSearchParams<{id: string}>();

  return <ExerciseBuilder id={parseId(id)} />;
}
