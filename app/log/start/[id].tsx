import WorkoutLog from "@/components/log/WorkoutLog";
import DefaultPage from "@/components/pages/DefaultPage";
import WorkoutLogBuilder, { WorkoutLogContext } from "@/services/builders/WorkoutLogBuilder";
import { useLocalSearchParams } from "expo-router";

import { View, Text } from "react-native";

export default function StartWorkout() {
  const { id } = useLocalSearchParams<{id: string}>();

  if (!id) {
    return (
      <DefaultPage title="Start Workout">
        <View>
          <Text>Workout not found</Text>
        </View>
      </DefaultPage>
    )
  }

  const log: WorkoutLogBuilder = new WorkoutLogBuilder(id);

  return (
    <WorkoutLogContext.Provider value={log}>
      <WorkoutLog log={log} />
    </WorkoutLogContext.Provider>
  );
}
