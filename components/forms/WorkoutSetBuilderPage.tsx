import { Alert, Modal, View } from "react-native";

import WorkoutSetBuilderForm from "@/components/forms/WorkoutSetBuilderForm";
import DefaultPage from "@/components/pages/DefaultPage";

import { Exercise, WorkoutSet } from "@/constants/types";
import { globalStyles } from "@/constants/styles";
import { MenuProvider } from "react-native-popup-menu";

interface AddExerciseProps {
  visibility: boolean;
  toggleVisibility: () => void;
  onAddSet: (workoutSet: WorkoutSet) => void;
}

// Modal to parse data from form into a workout builder form
export default function WorkoutSetBuilderPage({
  visibility,
  toggleVisibility,
  onAddSet,
}: AddExerciseProps) {
  let selected: Exercise;
  let sets: number = -1;

  function handleSetsChange(text: string) {
    sets = parseInt(text);
  }

  function handleExerciseChange(exercise: Exercise) {
    selected = exercise;
  }

  function saveExerciseSet() {
    // if no exercise or sets, don't save
    if (selected === undefined) {
      Alert.alert("No Exercise selected", "Please select an exercise.");
      return;
    } else if (sets < 0 || sets > 20) {
      Alert.alert(
        "Invalid Amount of Sets",
        "Please enter a valid number of sets between 0 and 20.",
      );
      return;
    }

    onAddSet({ exercise: selected, sets: sets });
    toggleVisibility();
  }

  return (
    <Modal
      transparent={true}
      visible={visibility}
      animationType="slide"
      presentationStyle="overFullScreen"
    >
      <MenuProvider skipInstanceCheck>
        <View style={globalStyles.modalContainer}>
          <DefaultPage title="Add New Set" toggleModal={toggleVisibility}>
            <WorkoutSetBuilderForm
              onSetsChange={handleSetsChange}
              onAddExercise={handleExerciseChange}
              saveExerciseSet={saveExerciseSet}
            />
          </DefaultPage>
        </View>
      </MenuProvider>
    </Modal>
  );
}
