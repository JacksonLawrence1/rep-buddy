import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

import Log from "@/components/log/Log";
import DefaultPage from "@/components/pages/DefaultPage";


export default function StartWorkout() {
  const { id, inProgress } = useLocalSearchParams<{id: string, inProgress?: string}>();

  if (!id) {
    return (
      <DefaultPage title="Start Workout">
        <Text>Workout not found</Text>
      </DefaultPage>
    )
  }

  return (
    <Log id={+id} inProgress={inProgress ? true : false} />
  );
}
