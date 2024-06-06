import { useState, useEffect } from "react";
import { FlatList, View } from "react-native";

import WorkoutItem from "@/components/workouts/WorkoutItem";

import { Workout } from "@/constants/types";
import { globalStyles } from "@/constants/styles";

import workoutService from "@/services/storage/WorkoutService";

interface WorkoutListProps {
  callerId: string; // to identify page requesting updates from service
  onEdit?: (workout: Workout) => void; // if we should have an edit button on the popout menu
}

export default function WorkoutList({ callerId, onEdit }: WorkoutListProps) {
  const [workouts, setWorkouts] = useState(workoutService.dataAsArray);

  // TODO: confirmation dialog before deleting
  function onDelete(workout: Workout) {
    workoutService.deleteData(workout.id);
  }

  useEffect(() => {
    const handleItemPress = (data: Map<string, Workout>) =>
      setWorkouts(Array.from(data.values()));

    workoutService.subscribe(callerId, handleItemPress);
    return () => workoutService.unsubscribe(callerId);
  }, [callerId]);

  return (
    <View style={globalStyles.scrollContainer}>
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <WorkoutItem
            key={index}
            workout={item}
            onDelete={() => onDelete(item)}
            onEdit={onEdit && (() => onEdit(item))}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
      />
    </View>
  );
}
