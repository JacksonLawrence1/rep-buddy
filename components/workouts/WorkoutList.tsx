import { FlatList, View } from "react-native";
import { useMemo } from "react";

import WorkoutItem from "@/components/workouts/WorkoutItem";

import { WorkoutCompressed } from "@/constants/types";
import { globalStyles } from "@/constants/styles";

import { deleteWorkout } from "@/features/workouts";
import { useDispatch } from "react-redux";

interface WorkoutListProps {
  workouts: WorkoutCompressed[];
  filter?: string;
  onPress?: (workout: WorkoutCompressed) => void; // when item is pressed
  onEdit?: (workout: WorkoutCompressed) => void; // if we should have an edit button on the popout menu
}

export default function WorkoutList({
  workouts,
  filter,
  onPress,
  onEdit,
}: WorkoutListProps) {
  const dispatch = useDispatch();

  function onDelete(workout: WorkoutCompressed) {
    dispatch(deleteWorkout(workout.id));
  }

  const filtered = useMemo(() => {
    return workouts
      .filter((workout) => workout.name
        .toLowerCase()
        .includes(filter?.toLowerCase() || ""))
      .sort((a, b) => a.name.localeCompare(b.name)
    );
  }, [workouts, filter]);

  return (
    <View style={globalStyles.scrollContainer}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <WorkoutItem
            key={index}
            workout={item}
            onPress={onPress && (() => onPress(item))}
            onDelete={() => onDelete(item)}
            onEdit={onEdit && (() => onEdit(item))}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
      />
    </View>
  );
}
