import { useLocalSearchParams } from "expo-router";

import DefaultPage from "@/components/pages/DefaultPage";
import Log from "@/components/log/Log";

import LogBuilder, { LogContext } from "@/services/builders/LogBuilder";

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
    <LogContext.Provider value={log}>
      <Log log={log} />
    </LogContext.Provider>
  );
}
