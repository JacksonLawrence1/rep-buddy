import { Modal, View } from "react-native";

import PageItemList from "@/components/pages/PageItemList";
import ExerciseItem from "@/components/listItems/ExerciseItem";

import { globalStyles } from "@/constants/styles";
import { Exercise } from "@/constants/types";

import exerciseService from "@/constants/storage/exercises";

interface ChooseExerciseProps {
  visibility: boolean;
  toggleVisibility: () => void;
  onPress: (exercise: Exercise) => void;
}

const serviceName: string = "exercisePickerService";

export default function ExercisePicker({
  visibility,
  toggleVisibility,
  onPress,
}: ChooseExerciseProps) {

  function handlePress(exercise: Exercise) {
    onPress(exercise);
    toggleVisibility();
  }

  return (
    <Modal
      transparent={true}
      visible={visibility}
      animationType="slide"
      presentationStyle="overFullScreen"
    >
      <View style={globalStyles.modalContainer}>
        <PageItemList
          callerId={serviceName}
          title="Choose Exercise"
          searchPlaceholder="Search for Exercise"
          service={exerciseService}
          ListComponent={ExerciseItem}
          onItemPress={handlePress}
          toggleModal={toggleVisibility}
        />
      </View>
    </Modal>
  );
}
