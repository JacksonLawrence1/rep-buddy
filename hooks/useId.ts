import { showAlert } from "@/features/alerts";
import { router, useLocalSearchParams } from "expo-router";
import { useDispatch } from "react-redux";

type SuccessContent = (id: number) => React.ReactNode;

export default function useId(successContent: SuccessContent, error?: string): React.ReactNode {
  const { id } = useLocalSearchParams<{id: string}>();
  const dispatch = useDispatch();

  if (id === undefined || id === "" || isNaN(parseInt(id))) {
    // if somehow the id is not a number, then route it as a new exercise
    if (error) {
      dispatch(showAlert({ title: "Invalid ID", description: error }));
    }

    router.back();
    return;
  }

  return successContent(+id);
}
