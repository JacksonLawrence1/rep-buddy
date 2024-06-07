import { FlatList, View } from "react-native";
import { useMemo } from "react";

import WorkoutItem from "@/components/workouts/WorkoutItem";

import { Workout } from "@/constants/types";
import { globalStyles } from "@/constants/styles";

import workoutService from "@/services/storage/WorkoutService";

interface WorkoutListProps {
  workouts: Workout[];
  filter?: string;
  onPress?: (workout: Workout) => void; // when item is pressed
  onEdit?: (workout: Workout) => void; // if we should have an edit button on the popout menu
}

export default function WorkoutList({ workouts, filter, onPress, onEdit }: WorkoutListProps) {
  function onDelete(workout: Workout) {
    workoutService.deleteData(workout.id);
  }

  const filtered = useMemo(() => {
    return workouts.filter((workout) => workout.name.toLowerCase().includes(filter?.toLowerCase() || ""));
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
