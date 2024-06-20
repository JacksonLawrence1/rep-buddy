import { useEffect } from "react";
import { FlatList, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { fetchExercises, selectExercisesByFilter } from "@/features/exercises";

import { AppDispatch, RootState } from "@/app/store";
import ExerciseItem from "@/components/exercises/ExerciseItem";

import { globalStyles } from "@/constants/styles";
import { Exercise } from "@/constants/types";

interface ExerciseListProps {
  filter?: string;
  onItemPress?: (exercise: Exercise) => void; // when item is pressed
}

export default function ExerciseList({
  filter,
  onItemPress,
}: ExerciseListProps) {

  const dispatch = useDispatch<AppDispatch>();
  const exercises = useSelector((state: RootState) => selectExercisesByFilter(state.exercises, filter));

  // get exercises from the database on mount
  useEffect(() => {
    dispatch(fetchExercises());
  }, [dispatch])

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
