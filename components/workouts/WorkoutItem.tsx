import { AppDispatch } from "@/app/store";
import ListItem from "@/components/primitives/ListItem";
import { Delete, Edit, History } from "@/components/primitives/PopoutMenus";

import { colors } from "@/constants/colors";
import { deleteWorkout } from "@/features/workouts";
import workoutDatabase from "@/services/database/Workouts";
import { router } from "expo-router";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";

interface WorkoutItemProps {
  id: number;
  name: string;
  onPress?: () => void;
  edit?: boolean; // include edit option
  del?: boolean; // include delete option
  history?: boolean; // include history option
}

export default function WorkoutItem({ id, name, onPress, edit, del, history }: WorkoutItemProps) {
  const dispatch = useDispatch<AppDispatch>();

  async function onDelete() {
    try {
      await workoutDatabase.deleteWorkout(id);
      dispatch(deleteWorkout(id));
    } catch (error) {
      Alert.alert("Workout Error", `Could not delete workout: ${error}`);
    }
  }

  function onEdit() {
    router.navigate({
      pathname: "/workouts/edit/[id]",
      params: { id: id },
    });
  }

  function onHistory() {
    router.navigate({
      pathname: "/workouts/history/[id]",
      params: { id: id },
    });
  }
  
  // options on the popout menu 
  const popoutMenuOptions: React.ReactNode[] = [];

  if (edit) {
    popoutMenuOptions.unshift(<Edit key={0} onPress={onEdit} />);
  }

  if (history) {
    popoutMenuOptions.unshift(<History key={1} onPress={onHistory} />);
  }

  // add popout menu options
  if (del) {
    popoutMenuOptions.unshift(<Delete key={2} onPress={onDelete} />);
  }

  return (
    <ListItem
      label={name}
      onPress={onPress}
      backgroundColor={colors.primary}
      popoutMenuOptions={{ options: popoutMenuOptions }}
    />
  );
}
