import ExercisePicker from "@/components/exercises/ExercisePicker";
import { resetState } from "@/hooks/useModal";
import { useNavigation } from "expo-router";

export default function Exercises() {
  // navigation state on reload: index -> here
  resetState(useNavigation(), ["index"]);

  return (
    <ExercisePicker />
  );
}
