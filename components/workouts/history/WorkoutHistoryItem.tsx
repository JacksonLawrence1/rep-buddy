import { WorkoutHistoryRow } from "@/services/database/WorkoutHistory";
import { View, Text } from "react-native";

interface WorkoutHistoryItemProps {
  workout: WorkoutHistoryRow;
}

export default function WorkoutHistoryItem({ workout }: WorkoutHistoryItemProps) {
  // TODO: get more detailed information about the workout
  return (
    <View>
      <Text>{workout.id}</Text>
    </View>
  );  
}
