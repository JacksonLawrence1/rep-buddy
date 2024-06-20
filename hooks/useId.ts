import { router, useLocalSearchParams } from "expo-router";
import { Alert } from "react-native";

type SuccessContent = (id: number) => React.ReactNode;

export default function useId(successContent: SuccessContent, error?: string): React.ReactNode {
  const { id } = useLocalSearchParams<{id: string}>();

  if (id === undefined || id === "" || isNaN(parseInt(id))) {
    // if somehow the id is not a number, then route it as a new exercise
    if (error) {
      Alert.alert("Invalid ID", error);
    }

    router.back();
    return;
  }

  return successContent(+id);
}
