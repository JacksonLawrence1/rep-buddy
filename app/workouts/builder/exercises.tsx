import { router } from "expo-router";

import ExercisePicker from "@/components/exercises/ExercisePicker";

import { onEdit, onNewExercise } from "@/app/exercises";
import { useModal } from "@/hooks/useModal";
import { MenuProvider } from "react-native-popup-menu";
import exerciseProvider from "@/services/providers/ExerciseProvider";

// when we click an item, or back button
function onPress() {
  router.back();
}

// when we exit the exercise picker
function onExit() {
  exerciseProvider.clearSubscribers();
}

export default function Exercises() {
  // if reloaded, this route will go back to the home screen
  useModal();

  return (
    <MenuProvider skipInstanceCheck>
      <ExercisePicker title={"Choose Exercise"} onAdd={onNewExercise} onPress={onPress} onEdit={onEdit} onExit={onExit} />
    </MenuProvider>
  );
}
