import { Alert, FlatList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "@/app/store";
import { deleteWorkout, fetchWorkouts, selectWorkoutsByFilter } from "@/features/workouts";

import WorkoutItem from "@/components/workouts/WorkoutItem";

import { globalStyles } from "@/constants/styles";
import { useEffect } from "react";
import workoutDatabase from "@/services/database/Workouts";

interface WorkoutListProps {
  filter?: string;
  onPress?: (workoutId: number) => void; // when item is pressed
  onEdit?: (workoutId: number) => void; // if we should have an edit button on the popout menu
}

export default function WorkoutList({
  filter,
  onPress,
  onEdit,
}: WorkoutListProps) {

  const dispatch = useDispatch<AppDispatch>();
  const workouts = useSelector((state: RootState) => selectWorkoutsByFilter(state.workouts, filter));

  // get exercises from the database on mount
  useEffect(() => {
    dispatch(fetchWorkouts());
  }, [dispatch])

  async function onDelete(id: number) {
    try {
      await workoutDatabase.deleteWorkout(id);
      dispatch(deleteWorkout(id));
    } catch (error) {
      Alert.alert("Exercise Error", `Could not delete exercise: ${error}`);
    }
  }

  return (
    <View style={globalStyles.scrollContainer}>
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <WorkoutItem
            key={item.id}
            name={item.name}
            onPress={onPress && (() => onPress(item.id))}
            onDelete={() => onDelete(item.id)}
            onEdit={onEdit && (() => onEdit(item.id))}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
      />
    </View>
  );
}
