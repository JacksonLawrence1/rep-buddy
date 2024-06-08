import { useLocalSearchParams } from "expo-router";

import DefaultPage from "@/components/pages/DefaultPage";
import Log from "@/components/log/Log";

import LogBuilder, { WorkoutLogContext } from "@/services/builders/LogBuilder";

import { Text } from "react-native";

export default function StartWorkout() {
  const { id } = useLocalSearchParams<{id: string}>();

  if (!id) {
    return (
      <DefaultPage title="Start Workout">
        <Text>Workout not found</Text>
      </DefaultPage>
    )
  }

  const log: LogBuilder = new LogBuilder(id);

  return (
    <WorkoutLogContext.Provider value={log}>
      <Log log={log} />
    </WorkoutLogContext.Provider>
  );
}
