import { FlatList, View } from "react-native";
import { useMemo } from "react";

import ExerciseItem from "@/components/exercises/ExerciseItem";

import { Exercise } from "@/constants/types";
import { globalStyles } from "@/constants/styles";
import exerciseService from "@/services/storage/ExerciseService";

interface ExerciseListProps {
  exercises: Exercise[];
  filter?: string;
  onItemPress?: (exercise: Exercise) => void; // when item is pressed
  onEdit?: (exercise: Exercise) => void; // if we should have an edit button on the popout menu
}

export default function ExerciseList({
  exercises,
  filter,
  onItemPress,
  onEdit,
}: ExerciseListProps) {

  function onDelete(exercise: Exercise) {
    exerciseService.deleteData(exercise.id);
  }

  const filteredExercises: Exercise[] = useMemo(() => {
    return exercises.filter((exercise) => exercise.name.toLowerCase().includes(filter?.toLowerCase() || ""));
  }, [exercises, filter]);

  return (
    <View style={globalStyles.scrollContainer}>
      <FlatList
        data={filteredExercises}
        keyExtractor={(item) => item.id}
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
