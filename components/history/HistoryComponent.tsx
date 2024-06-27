import { router } from "expo-router";
import { Alert } from "react-native";

import useLoading, { SetContentStateAction } from "@/hooks/useLoading";

import DefaultPage from "../pages/DefaultPage";
import HistoryList from "./HistoryList";

export type WithId = { id: number };

export interface HistoryListItemProps<T extends WithId> {
  name?: string;
  history: T;
  onDelete?: (id: number) => void;
}

export interface HistoryDetails {
  title?: string;
  date?: string;
}

interface HistoryComponentProps<T extends WithId> {
  title?: string;
  modal?: boolean;
  id: number;
  onGetHistory: (id: number) => Promise<T[]>;
  HistoryListItem: React.ComponentType<HistoryListItemProps<T>>;
  onGetDetails?: (id: number) => Promise<HistoryDetails>;
}

export default function HistoryComponent<T extends WithId>({
  title,
  modal = true,
  id,
  onGetHistory,
  onGetDetails,
  HistoryListItem,
}: HistoryComponentProps<T>) {
  const content = useLoading(loadExerciseHistory);

  async function getDetails(): Promise<HistoryDetails | undefined> {
    if (!onGetDetails) {
      return;
    }

    return await onGetDetails(id);
  }

  async function loadExerciseHistory(setContent: SetContentStateAction) {
    try {
      const details = await getDetails();
      const history = await onGetHistory(id);

      setContent(
        <HistoryList
          history={history}
          HistoryRenderer={HistoryListItem}
          {...details} // pass title/date if provided
        />,
      );
    } catch {
      Alert.alert(
        "Error",
        "There was an error loading the history. Please try restarting the app.",
      );
      router.back();
    }
  }

  return (
    <DefaultPage title={title || "History"} theme={modal ? "modal" : "default"}>
      {content}
    </DefaultPage>
  );
}
