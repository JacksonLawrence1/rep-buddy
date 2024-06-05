import { useState, useEffect } from "react";
import { FlatList, View } from "react-native";

import ExerciseItem from "@/components/exercises/ExerciseItem";

import { Exercise } from "@/constants/types";
import { globalStyles } from "@/constants/styles";

import exerciseService from "@/constants/storage/exercises";

interface ExerciseListProps {
  callerId: string;
  onItemPress?: (exercise: Exercise) => void;
  onEdit?: (exercise: Exercise) => void;
}

export default function ExerciseList({
  callerId,
  onItemPress,
  onEdit,
}: ExerciseListProps) {
  const [exercises, setExercises] = useState(exerciseService.dataAsArray);

  // TODO: confirmation dialog before deleting
  function onDelete(exercise: Exercise) {
    exerciseService.deleteData(exercise.id);
  }

  useEffect(() => {
    const handleItemPress = (data: Map<string, Exercise>) =>
      setExercises(Array.from(data.values()));

    exerciseService.subscribe(callerId, handleItemPress);
    return () => exerciseService.unsubscribe(callerId);
  }, [callerId]);

  return (
    <View style={globalStyles.scrollContainer}>
      <FlatList
        data={exercises}
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
