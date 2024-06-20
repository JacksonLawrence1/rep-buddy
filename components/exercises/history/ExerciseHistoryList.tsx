import { Alert, FlatList, View, Text } from "react-native";

import ExerciseHistoryItem from "@/components/exercises/history/ExerciseHistoryItem";
import { ExerciseHistoryDisplay } from "@/services/database/ExerciseHistory";
import { globalStyles } from "@/constants/styles";
import { useState } from "react";
import historyDatabase from "@/services/database/History";

interface ExerciseHistoryListProps {
  exerciseHistory: ExerciseHistoryDisplay[];
}

export default function ExerciseHistoryList({
  exerciseHistory,
}: ExerciseHistoryListProps) {
  // history should never update while the component is mounted
  // so we can use a simple state to store the history
  const [history, setHistory] = useState<ExerciseHistoryDisplay[]>(exerciseHistory);

  async function deleteExerciseHistory(id: number) {
    try {
      await historyDatabase.deleteExerciseHistory(id);
      setHistory((history) => history.filter((exercise) => exercise.id !== id));
    } catch (error) {
      Alert.alert("Exercise History Error", `Could not delete exercise history: ${error}`);
    }
  }

  if (history.length === 0) {
    return (
      <View style={globalStyles.scrollContainer}>
        <View style={{flex: 0.75, justifyContent: 'center'}}>
          <Text style={globalStyles.title}>No history was found</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={globalStyles.scrollContainer}>
      <FlatList
        data={history}
        renderItem={({ item }) => <ExerciseHistoryItem history={item} onDelete={deleteExerciseHistory} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
