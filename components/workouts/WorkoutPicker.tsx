import { useState } from "react";
import { router } from "expo-router";

import { WorkoutPickerContext } from "@/hooks/contexts/WorkoutPickerContext";

import WorkoutList from "@/components/workouts/WorkoutList";
import Searchbar from "@/components/inputs/Searchbar";
import DefaultPage from "@/components/pages/DefaultPage";
import Button from "@/components/buttons/Button";
import { AlertContextProps } from "@/components/primitives/Alert";

interface WorkoutPickerProps {
  title?: string;
  onPress?: (id: number) => void; // when a workout is selected
  alertSettings?: AlertContextProps;
}


export default function WorkoutPicker({ title, onPress, alertSettings }: WorkoutPickerProps) {
  const [filter, setFilter] = useState("");

  function onAdd() {
    router.navigate("/workouts/new");
  }

  return (
    <DefaultPage title={title || "Your Workouts"}>
      <Searchbar placeholder="Search for a workout" onChangeText={setFilter} />
      <WorkoutPickerContext.Provider value={alertSettings || { enabled: false }}>
        <WorkoutList filter={filter} onPress={onPress} />
      </WorkoutPickerContext.Provider>
      <Button
        label="Add New Workout"
        theme="primary"
        icon={"plus"}
        onPress={onAdd}
      />
    </DefaultPage>
  );
}
