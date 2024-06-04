import { Modal, View } from "react-native";

import PageItemList from "@/components/pages/PageItemList";
import ExerciseItem from "@/components/listItems/ExerciseItem";
import LinkButton from "@/components/buttons/LinkButton";

import { globalStyles } from "@/constants/styles";
import { Exercise } from "@/constants/types";

import exerciseService from "@/constants/storage/exercises";
import { MenuProvider } from "react-native-popup-menu";

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

  function FooterComponent(): React.ReactNode {
    return <LinkButton href="/exercises/addExercise" theme="primary" label="Add Exercise" icon={"plus"} />
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
          <PageItemList
            callerId={serviceName}
            title="Choose Exercise"
            searchPlaceholder="Search for Exercise"
            service={exerciseService}
            backRoute="/workouts"
            ListComponent={ExerciseItem}
            onItemPress={handlePress}
            FooterComponent={FooterComponent()}
            toggleModal={toggleVisibility}
          />
        </View>
      </MenuProvider>
    </Modal>
  );
}
