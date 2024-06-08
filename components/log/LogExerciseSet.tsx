import { FontAwesome5 } from "@expo/vector-icons";
import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import LogExerciseSetItem from "@/components/log/LogExerciseSetItem";
import ListItem from "@/components/primitives/ListItem";
import { Delete, GenericMenuOption } from "@/components/primitives/PopoutMenus";

import { colors } from "@/constants/colors";
import { LogExerciseSet as LogExerciseSetType } from "@/constants/types";

import LogBuilder, { WorkoutLogContext } from "@/services/builders/LogBuilder";

interface WorkoutExerciseProps {
  index: number,
  exerciseSet: LogExerciseSetType;
  onSwap?: (index: number) => void;
}

export default function LogExerciseSet({ index, exerciseSet, onSwap }: WorkoutExerciseProps) {
  const log: LogBuilder | null = useContext(WorkoutLogContext);

  if (!log) return null;

  // options on the popout menu
  const popoutMenuOptions: React.ReactNode[] = [
    <Delete key={0} onPress={() => log.removeExercise(index)} />,
  ];

  if (onSwap) {
    popoutMenuOptions.push(<GenericMenuOption key={1} label="Swap" icon="exchange-alt" onPress={() => onSwap(index)} />);
  }
  
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
      <LogExerciseSetItem key={index} sets={exerciseSet.sets} i={index} />
      <View style={styles.anotherSetContainer}>
        <Text style={[styles.text, {textTransform: 'uppercase'}]}>Add Set</Text>
        <Pressable style={styles.addSetButton} onPress={() => log.addSet(index)}>
          <FontAwesome5 name="plus" size={16} color={colors.text} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addSetButton: {
    flexDirection: "row",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: colors.greenTint,
  },
  anotherSetContainer: {
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    gap: 24,
    borderTopWidth: 1,
    borderColor: colors.border,
  },
  text: {
    color: colors.text,
    fontSize: 16,
    fontFamily: "Rubik-Regular",
    textTransform: "uppercase",
  },
  workoutContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.inputBackground,
    borderRadius: 8,
    marginBottom: 8,
  },
});
