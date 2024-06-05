import { useState, useEffect } from "react";
import { FlatList, View } from "react-native";

import WorkoutItem from "@/components/workouts/WorkoutItem";

import { Workout } from "@/constants/types";
import { globalStyles } from "@/constants/styles";

import workoutService from "@/constants/storage/workouts";

interface WorkoutListProps {
  callerId: string;
}

export default function WorkoutList({ callerId }: WorkoutListProps) {
  const [workouts, setWorkouts] = useState(workoutService.dataAsArray);

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
          renderItem={({ item, index }) => <WorkoutItem key={index} workout={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
        />
      </View>
  );
}
