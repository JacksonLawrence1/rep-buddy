import { useLocalSearchParams } from "expo-router";

import Log from "@/components/log/Log";
import useId from "@/hooks/useId";


export default function StartWorkout() {
  const { inProgress } = useLocalSearchParams<{inProgress?: string}>();

  function loadWorkout(id: number) {
    return <Log id={id} inProgress={inProgress ? true : false} />;
  }

  return useId(loadWorkout, "Could not find workout, please try restarting the app.");
}
