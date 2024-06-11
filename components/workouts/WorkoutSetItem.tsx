import { StyleSheet, View } from "react-native";

import NumberPicker from "@/components/inputs/NumberPicker";
import ListItem from "@/components/primitives/ListItem";
import { Delete, GenericMenuOption } from "@/components/primitives/PopoutMenus";

import { colors } from "@/constants/colors";
import { WorkoutSet } from "@/constants/types";

interface WorkoutBaseProps {
  item: WorkoutSet;
  onSetChange?: (sets: number) => void;
  onDelete?: () => void;
  onSwap?: () => void;
}

export default function WorkoutSetItem({ item, onSetChange, onDelete, onSwap }: WorkoutBaseProps) {
  // options on the popout menu
  const popoutMenuOptions: React.ReactNode[] = [];

  if (onDelete) {
    popoutMenuOptions.push(<Delete key={0} onPress={onDelete} />);
  }

  // Ideally, use generic function to create this array, but this would involve annoying prop passing
  if (onSwap) {
    popoutMenuOptions.push(<GenericMenuOption key={1} label="Swap" icon="exchange-alt" onPress={onSwap} />);
  }

  return (
    <View style={styles.workoutContainer}>
      <ListItem
        label={item.exercise.name}
        backgroundColor={colors.tertiary}
        popoutMenuOptions={{
          icon: "ellipsis-h",
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
        <NumberPicker start={item.sets} onChange={onSetChange || (() => undefined)} />
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
