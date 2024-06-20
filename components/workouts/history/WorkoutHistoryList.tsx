import { FlatList, View } from "react-native";

import { globalStyles } from "@/constants/styles";
import { WorkoutHistoryRow } from "@/services/database/WorkoutHistory";
import WorkoutHistoryItem from "./WorkoutHistoryItem";

interface WorkoutHistoryListProps {
  workoutHistory: WorkoutHistoryRow[];
}

export default function WorkoutHistoryList({ workoutHistory }: WorkoutHistoryListProps) {
  return (
    <View style={globalStyles.scrollContainer}>
      <FlatList
        data={workoutHistory}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <WorkoutHistoryItem workout={item} />}
      />
    </View>
  );
}
