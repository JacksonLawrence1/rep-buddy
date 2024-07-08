import { StyleSheet, View } from "react-native";

import NumberPicker from "@/components/inputs/NumberPicker";
import ListItem from "@/components/primitives/ListItem";
import {
  History,
  Delete,
  GenericMenuOption,
} from "@/components/primitives/PopoutMenus";

import { colors } from "@/constants/colors";
import { WorkoutSet } from "@/constants/types";
import { gotoExerciseHistory } from "@/features/routes";

interface WorkoutBaseProps {
  item: WorkoutSet;
  updateSet: (set: number) => void;
  onDelete?: () => void;
  onSwap?: () => void;
  history?: boolean; // whether to show exercise history option
}

export default function WorkoutSetItem({
  item,
  onDelete,
  updateSet,
  onSwap,
  history,
}: WorkoutBaseProps) {
  // options on the popout menu
  const popoutMenuOptions: React.ReactNode[] = [];

  if (onDelete) {
    popoutMenuOptions.push(<Delete onPress={onDelete} />);
  }

  // Ideally, use generic function to create this array, but this would involve annoying prop passing
  if (onSwap) {
    popoutMenuOptions.push(
      <GenericMenuOption
        label="Swap"
        icon="exchange-alt"
        onPress={onSwap}
      />,
    );
  }

  if (history) {
    popoutMenuOptions.push(
      <History onPress={() => gotoExerciseHistory(item.exercise.id)} />,
    );
  }

  return (
    <View style={styles.workoutContainer}>
      <ListItem
        label={item.exercise.name}
        backgroundColor={colors.tertiary}
        popoutMenuOptions={{
          options: popoutMenuOptions,
        }}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <NumberPicker start={item.sets} onChange={updateSet} />
      </View>
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
  workoutIcon: {
    color: colors.text,
  },
});
