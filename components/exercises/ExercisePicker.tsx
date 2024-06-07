import ExerciseList from "@/components/exercises/ExerciseList";
import Searchbar from "@/components/inputs/Searchbar";
import DefaultPage from "@/components/pages/DefaultPage";
import Button from "@/components/buttons/Button";

import { Exercise } from "@/constants/types";

import exerciseProvider from "@/services/providers/ExerciseProvider";
import { useExerciseService } from "@/hooks/services/useExerciseService";
import { useState } from "react";

interface ChooseExerciseProps {
  title?: string;
  onPress?: (exercise: Exercise) => void; // when an exercise is selected
  onAdd?: () => void; // called when user clicks new exercise button
  onEdit?: (exercise: Exercise) => void; // called when an exercise is edited
  onExit?: () => void; // called when user exits the exercise picker
}

export default function ExercisePicker({
  title,
  onPress,
  onAdd,
  onEdit,
  onExit,
}: ChooseExerciseProps) {
  // wrap the onPress function to also call the exercise provider
  const handleExerciseSelection = onPress
    ? (exercise: Exercise) => {
        exerciseProvider.pickExercise(exercise);
        onPress(exercise);
      }
    : undefined;

  const exercises: Exercise[] = useExerciseService();
  const [filter, setFilter] = useState("");

  return (
    <DefaultPage title={title || "Your Exercises"} callback={onExit}>
      <Searchbar placeholder="Search for an exercise" onChangeText={setFilter} />
      <ExerciseList
        exercises={exercises}
        filter={filter}
        onItemPress={handleExerciseSelection}
        onEdit={onEdit}
      />
      {onAdd && (
        <Button
          label="Add New Exercise"
          theme="primary"
          icon={"plus"}
          onPress={onAdd}
        />
      )}
    </DefaultPage>
  );
}
