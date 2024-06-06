import { router } from "expo-router";

import ExercisePicker from "@/components/exercises/ExercisePicker";

import { onEdit, onNewExercise } from "@/app/exercises";
import { useModal } from "@/hooks/useModal";
import { MenuProvider } from "react-native-popup-menu";

const callerId: string = "exercisesPage";

export function onPress() {
  router.back();
}

export default function Exercises() {
  // if reloaded, this route will go back to the home screen
  useModal();

  return (
    <MenuProvider skipInstanceCheck>
      <ExercisePicker
        callerId={callerId}
        onAdd={onNewExercise}
        onPress={onPress}
        onEdit={onEdit}
      />
    </MenuProvider>
  );
}
