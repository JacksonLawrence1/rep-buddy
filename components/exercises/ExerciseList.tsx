import { useEffect } from "react";
import { Alert, FlatList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { deleteExercise, fetchExercises, selectExercisesByFilter } from "@/features/exercises";
import exerciseDatabase from "@/services/database/Exercises";

import { AppDispatch, RootState } from "@/app/store";
import ExerciseItem from "@/components/exercises/ExerciseItem";

import { globalStyles } from "@/constants/styles";
import { Exercise } from "@/constants/types";

interface ExerciseListProps {
  filter?: string;
  onItemPress?: (exercise: Exercise) => void; // when item is pressed
  onEdit?: (exercise: Exercise) => void; // if we should have an edit button on the popout menu
}

export default function ExerciseList({
  filter,
  onItemPress,
  onEdit,
}: ExerciseListProps) {

  const dispatch = useDispatch<AppDispatch>();
  const exercises = useSelector((state: RootState) => selectExercisesByFilter(state.exercises, filter));
  
  // get exercises from the database on mount
  useEffect(() => {
    dispatch(fetchExercises());
  }, [dispatch])

  async function onDelete(exercise: Exercise) {
    try {
      await exerciseDatabase.deleteExercise(exercise.id);
      dispatch(deleteExercise(exercise.id));
    } catch (error) {
      Alert.alert("Exercise Error", `Could not delete exercise: ${error}`);
    }
  }

  return (
    <View style={globalStyles.scrollContainer}>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <ExerciseItem
            key={index}
            exercise={item}
            onPress={onItemPress && (() => onItemPress(item))}
            onDelete={() => onDelete(item)}
            onEdit={onEdit && (() => onEdit(item))}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
      />
    </View>
  );
}
