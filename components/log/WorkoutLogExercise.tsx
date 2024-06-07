import { View, StyleSheet } from "react-native";

import ListItem from "@/components/primitives/ListItem";

import { colors } from "@/constants/colors";
import { WorkoutLogExerciseUncompressed } from "@/constants/types";
import { Delete, GenericMenuOption } from "../primitives/PopoutMenus";
import WorkoutLogSetItem from "./WorkoutLogSetItem";

interface WorkoutExerciseProps {
  index: number,
  exerciseSet: WorkoutLogExerciseUncompressed;
}

export default function WorkoutLogExercise({ index, exerciseSet }: WorkoutExerciseProps) {
  // options on the popout menu
  const popoutMenuOptions: React.ReactNode[] = [
    <Delete key={0} onPress={() => undefined} />,
    <GenericMenuOption key={1} label="Swap Exercise" icon="exchange-alt" onPress={() => undefined} />,
    <GenericMenuOption key={2} label="History" icon="history" onPress={() => undefined} />,
  ];
  
  return (
    <View style={styles.workoutContainer}>
      <ListItem
        label={exerciseSet.exercise.name}
        backgroundColor={colors.tertiary}
        popoutMenuOptions={{
          icon: "ellipsis-h",
          options: popoutMenuOptions,
        }}
      />
      <WorkoutLogSetItem key={index} sets={exerciseSet.sets} i={index} />
    </View>
  );
}

const styles = StyleSheet.create({
  workoutContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
    marginBottom: 8,
  },
});
