import { useState, useEffect } from "react";
import { FlatList, View } from "react-native";

import ExerciseItem from "@/components/exercises/ExerciseItem";

import { Exercise } from "@/constants/types";
import { globalStyles } from "@/constants/styles";

import exerciseService from "@/services/storage/ExerciseService";

interface ExerciseListProps {
  callerId: string; // to identify page requesting updates from service
  onItemPress?: (exercise: Exercise) => void; // when item is pressed
  onEdit?: (exercise: Exercise) => void; // if we should have an edit button on the popout menu
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

  // update state of list whenever data changes
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
