import { FlatList, View, Text, Alert } from "react-native";

import { globalStyles } from "@/constants/styles";
import { useState } from "react";
import useLoading, { SetContentStateAction } from "@/hooks/useLoading";
import DefaultPage from "../pages/DefaultPage";
import { router } from "expo-router";

type DeleteCallback = (id: number) => Promise<any>;
type WithId = { id: number };

interface HistoryListItemProps<T extends WithId> {
  history: T;
  onDelete: DeleteCallback;
}

interface HistoryListProps<T extends WithId> {
  history: T[];
  HistoryRenderer: React.ComponentType<HistoryListItemProps<T>>;
  onDelete: DeleteCallback;
}

interface HistoryListFactoryProps<T extends WithId> {
  id: number;
  onGetHistory: (id: number) => Promise<T[]>;
  HistoryRenderer: React.ComponentType<HistoryListItemProps<T>>;
  onDelete: DeleteCallback;
}

export default function HistoryList<T extends WithId>({ id, onGetHistory, HistoryRenderer, onDelete }: HistoryListFactoryProps<T>) {
  const content = useLoading(loadExerciseHistory);

  function loadExerciseHistory(setContent: SetContentStateAction) {
    onGetHistory(id)
      .then((history) => {
        setContent(
          <HistoryListRenderer
            history={history}
            HistoryRenderer={HistoryRenderer}
            onDelete={onDelete}
          />,
        );
      })
      .catch(() => {
        Alert.alert(
          "Error",
          "There was an error loading the history. Please try restarting the app.",
        );

        router.back();
      });
  }

  return (
    <DefaultPage title="History" theme={"modal"}>
      {content}
    </DefaultPage>
  );
}

function HistoryListRenderer<T extends WithId>({
  history,
  HistoryRenderer,
  onDelete,
}: HistoryListProps<T>) {
  const [historyList, setHistory] = useState<T[]>(history);

  async function deleteHistory(id: number) {
    try {
      await onDelete(id);
      setHistory((history) => history.filter((item) => item.id !== id));
    } catch (error) {
      Alert.alert("Delete History Error", `Could not delete history: ${error}`);
    }
  }

  if (history.length === 0) {
    return (
      <View style={globalStyles.scrollContainer}>
        <View style={{flex: 0.75, justifyContent: 'center'}}>
          <Text style={globalStyles.title}>No history was found</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={globalStyles.scrollContainer}>
      <FlatList
        data={historyList}
        renderItem={({ item }) => <HistoryRenderer history={item} onDelete={deleteHistory} />}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      />
    </View>
  );
}
