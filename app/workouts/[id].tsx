// Dynamic route for editing workouts using their id

import { useLocalSearchParams } from "expo-router";

import WorkoutBuilder from "./workoutBuilder";

import { parseId } from "@/constants/storage/utils";

export default function WorkoutBuilderPage() {
  const { id } = useLocalSearchParams<{id: string}>();

  return <WorkoutBuilder id={parseId(id)} />;
}
