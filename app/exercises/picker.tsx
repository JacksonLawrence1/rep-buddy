import ExercisePicker from "@/components/exercises/ExercisePicker";

import { useModal } from "@/hooks/useModal";
import { MenuProvider } from "react-native-popup-menu";

export default function Exercises() {
  // if reloaded, this route will go back to the home screen
  useModal();

  return (
    <MenuProvider skipInstanceCheck>
      <ExercisePicker title={"Choose Exercise"} />
    </MenuProvider>
  );
}
