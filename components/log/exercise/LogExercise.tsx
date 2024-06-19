import { useContext } from "react";
import { StyleSheet, View } from "react-native";

import { LogContext } from "@/services/builders/LogBuilder";

import ListItem from "@/components/primitives/ListItem";
import { Delete, GenericMenuOption } from "@/components/primitives/PopoutMenus";
import LogExerciseSets from "@/components/log/exercise/LogExerciseSets";

import { colors } from "@/constants/colors";
import { LogExerciseSet as LogExerciseSetType } from "@/constants/types";

interface LogExerciseProps {
  index: number,
  exerciseSet: LogExerciseSetType;
  onSwap: (index: number) => void; // on swapping the exercise
  onDelete: (index: number) => void; // on deleting the exercise
}

export default function LogExercise({ index, exerciseSet, onSwap, onDelete }: LogExerciseProps) {
  const log = useContext(LogContext);

  if (!log) {
    return null;
  }

  // options on the popout menu
  const popoutMenuOptions: React.ReactNode[] = [
    <Delete key={0} onPress={() => onDelete(index)} />,
  ];

  if (onSwap) {
    popoutMenuOptions.push(<GenericMenuOption key={1} label="Swap" icon="exchange-alt" onPress={() => onSwap(index)} />);
  }

  return (
    <View style={styles.workoutContainer}>
      <ListItem
        label={exerciseSet.exercise.name}
        backgroundColor={colors.tertiary}
        height={52}
        popoutMenuOptions={{
          icon: "ellipsis-h",
          options: popoutMenuOptions,
        }}
      />
      <LogExerciseSets key={index} sets={exerciseSet.sets} i={index} />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.text,
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    textTransform: "uppercase",
  },
  workoutContainer: {
    justifyContent: "space-between",
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
    marginBottom: 8,
  },
});
