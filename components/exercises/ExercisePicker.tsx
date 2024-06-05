import Searchbar from "@/components/inputs/Searchbar";
import DefaultPage from "@/components/pages/DefaultPage";
import ExerciseList from "@/components/exercises/ExerciseList";
import Button from "../buttons/Button";

import { Exercise } from "@/constants/types";

interface ChooseExerciseProps {
  callerId: string; // the id of the caller
  onPress?: (exercise: Exercise) => void; // when an exercise is selected
  onAdd?: () => void; // called when user clicks new exercise button
  onEdit?: (exercise: Exercise) => void; // called when an exercise is edited
  onBack: () => void; // when the back button is pressed
}

export default function ExercisePicker({
  callerId,
  onPress,
  onAdd,
  onEdit,
  onBack,
}: ChooseExerciseProps) {

  return (
    <DefaultPage title="Choose Exercise" onBack={onBack}>
      <Searchbar placeholder="Search for an exercise" />
      <ExerciseList callerId={callerId} onItemPress={onPress} onEdit={onEdit} />
      {onAdd && <Button label="Add New Exercise" theme="primary" icon={"plus"} onPress={onAdd} />}
    </DefaultPage>
  );
}
