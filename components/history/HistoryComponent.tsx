import { router } from "expo-router";
import { Alert } from "react-native";

import useLoading, { SetContentStateAction } from "@/hooks/useLoading";

import DefaultPage from "../pages/DefaultPage";
import HistoryList from "./HistoryList";

export type DeleteCallback = (id: number) => Promise<any>;
export type WithId = { id: number };

export interface HistoryListItemProps<T extends WithId> {
  name?: string;
  history: T;
  onDelete?: DeleteCallback;
}

interface HistoryComponentProps<T extends WithId> {
  title?: string;
  modal?: boolean;
  id: number;
  onGetHistory: (id: number) => Promise<T[]>;
  HistoryListItem: React.ComponentType<HistoryListItemProps<T>>;
  onDelete: DeleteCallback;
  onGetTitle?: (id: number) => Promise<string>;
}

export default function HistoryComponent<T extends WithId>({
  title,
  modal = true,
  id,
  onGetHistory,
  onGetTitle,
  HistoryListItem,
  onDelete,
}: HistoryComponentProps<T>) {
  const content = useLoading(loadExerciseHistory);

  async function getTitle(): Promise<string | undefined> {
    if (!onGetTitle) {
      return;
    }

    return await onGetTitle(id);
  }

  async function loadExerciseHistory(setContent: SetContentStateAction) {
    try {
      const title = await getTitle();
      const history = await onGetHistory(id);

      setContent(
        <HistoryList
          history={history}
          HistoryRenderer={HistoryListItem}
          onDelete={onDelete}
          title={title}
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
