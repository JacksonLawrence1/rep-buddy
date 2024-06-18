import { useState } from "react";

import WorkoutList from "@/components/workouts/WorkoutList";
import Searchbar from "@/components/inputs/Searchbar";
import DefaultPage from "@/components/pages/DefaultPage";
import Button from "@/components/buttons/Button";

interface WorkoutPickerProps {
  title?: string;
  onPress?: (id: number) => void; // when a workout is selected
  onAdd?: () => void; // when user clicks new workout button
  onEdit?: (id: number) => void; // when workout is edited
  onExit?: () => void; // called when user exits the workout picker
}

export default function WorkoutPicker({
  title,
  onPress,
  onAdd,
  onEdit,
  onExit,
}: WorkoutPickerProps) {
  const [filter, setFilter] = useState("");

  return (
    <DefaultPage title={title || "Your Workouts"} callback={onExit}>
      <Searchbar placeholder="Search for a workout" onChangeText={setFilter} />
      <WorkoutList
        filter={filter}
        onPress={onPress}
        onEdit={onEdit}
      />
      {onAdd && (
        <Button
          label="Add New Workout"
          theme="primary"
          icon={"plus"}
          onPress={onAdd}
        />
      )}
    </DefaultPage>
  );
}
