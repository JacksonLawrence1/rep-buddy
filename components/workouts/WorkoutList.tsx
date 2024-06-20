import { FlatList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/app/store";
import { fetchWorkouts, selectWorkoutsByFilter } from "@/features/workouts";

import WorkoutItem from "@/components/workouts/WorkoutItem";

import { globalStyles } from "@/constants/styles";
import { useEffect } from "react";

interface WorkoutListProps {
  filter?: string;
  onPress?: (workoutId: number) => void; // when item is pressed
}

export default function WorkoutList({
  filter,
  onPress,
}: WorkoutListProps) {

  const dispatch = useDispatch<AppDispatch>();
  const workouts = useSelector((state: RootState) => selectWorkoutsByFilter(state.workouts, filter));

  // get exercises from the database on mount
  useEffect(() => {
    dispatch(fetchWorkouts());
  }, [dispatch])

  return (
    <View style={globalStyles.scrollContainer}>
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <WorkoutItem
            id={item.id}
            key={item.id}
            name={item.name}
            onPress={onPress && (() => onPress(item.id))}
            del={true}
            edit={true}
            history={true}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
      />
    </View>
  );
}
