import { useState } from "react";

import WorkoutList from "@/components/workouts/WorkoutList";
import Searchbar from "@/components/inputs/Searchbar";
import DefaultPage from "@/components/pages/DefaultPage";
import Button from "@/components/buttons/Button";
import { router } from "expo-router";

interface WorkoutPickerProps {
  title?: string;
  onPress?: (id: number) => void; // when a workout is selected
}

export default function WorkoutPicker({
  title,
  onPress,
}: WorkoutPickerProps) {
  const [filter, setFilter] = useState("");

  function onAdd() {
    router.navigate("/workouts/new");
  }

  return (
    <DefaultPage title={title || "Your Workouts"}>
      <Searchbar placeholder="Search for a workout" onChangeText={setFilter} />
      <WorkoutList
        filter={filter}
        onPress={onPress}
      />
      <Button
        label="Add New Workout"
        theme="primary"
        icon={"plus"}
        onPress={onAdd}
      />
    </DefaultPage>
  );
}
