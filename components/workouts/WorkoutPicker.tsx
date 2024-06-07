import WorkoutList from "@/components/workouts/WorkoutList";
import Searchbar from "@/components/inputs/Searchbar";
import DefaultPage from "@/components/pages/DefaultPage";
import Button from "@/components/buttons/Button";

import { Workout } from "@/constants/types";

import { useState } from "react";
import { useWorkoutService } from "@/hooks/services/useWorkoutService";

interface WorkoutPickerProps {
  title?: string;
  onPress?: (workout: Workout) => void; // when a workout is selected
  onAdd?: () => void; // when user clicks new workout button
  onEdit?: (workout: Workout) => void; // when workout is edited
  onExit?: () => void; // called when user exits the workout picker
}

export default function WorkoutPicker({
  title,
  onPress,
  onAdd,
  onEdit,
  onExit,
}: WorkoutPickerProps) {
  const workouts: Workout[] = useWorkoutService();
  const [filter, setFilter] = useState("");

  return (
    <DefaultPage title={title || "Your Workouts"} callback={onExit}>
      <Searchbar placeholder="Search for a workout" onChangeText={setFilter} />
      <WorkoutList
        workouts={workouts}
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
