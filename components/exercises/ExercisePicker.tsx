import ExerciseList from "@/components/exercises/ExerciseList";
import Searchbar from "@/components/inputs/Searchbar";
import DefaultPage from "@/components/pages/DefaultPage";
import Button from "@/components/buttons/Button";

import { Exercise } from "@/constants/types";

import exerciseProvider from "@/services/providers/ExerciseProvider";

interface ChooseExerciseProps {
  callerId: string; // the id of the caller
  onPress?: (exercise: Exercise) => void; // when an exercise is selected
  onAdd?: () => void; // called when user clicks new exercise button
  onEdit?: (exercise: Exercise) => void; // called when an exercise is edited
}

export default function ExercisePicker({
  callerId,
  onPress,
  onAdd,
  onEdit,
}: ChooseExerciseProps) {
  // wrap the onPress function to also call the exercise provider
  const handleExerciseSelection = onPress
    ? (exercise: Exercise) => {
        exerciseProvider.pickExercise(exercise);
        onPress(exercise);
      }
    : undefined;

  return (
    <DefaultPage title="Choose Exercise">
      <Searchbar placeholder="Search for an exercise" />
      <ExerciseList
        callerId={callerId}
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
