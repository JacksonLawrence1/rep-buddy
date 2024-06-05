import { View, StyleSheet } from "react-native";

import ListItem from "@/components/primitives/ListItem";
import { Delete, GenericMenuOption } from "@/components/primitives/PopoutMenus";

import { colors } from "@/constants/colors";
import { WorkoutSetUncompressed } from "@/constants/types";

interface WorkoutBaseProps {
  item: WorkoutSetUncompressed;
  onDelete?: () => void;
  onSwap?: () => void;
}

export default function WorkoutBase({ item, onDelete, onSwap }: WorkoutBaseProps) {
  // options on the popout menu
  const popoutMenuOptions: React.ReactNode[] = [];

  if (onDelete) {
    popoutMenuOptions.push(<Delete key={0} onPress={onDelete} />);
  }

  // Ideally, use generic function to create this array, but this would involve annoying prop passing
  if (onSwap) {
    popoutMenuOptions.push(<GenericMenuOption key={1} label="Swap" icon="exchange" onPress={onSwap} />);
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
        }}
      >
        <ListItem
          label={`Minimum Sets: ${item.sets}`}
          backgroundColor={colors.inputBackground}
        />
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
