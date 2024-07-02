import { FlatList, StyleSheet, Text, View } from "react-native";

import settings from "@/constants/settings";
import { globalStyles } from "@/constants/styles";
import { useState } from "react";
import {
    HistoryListItemProps,
    WithId,
} from "./HistoryComponent";

interface HistoryListProps<T extends WithId> {
  history: T[];
  HistoryRenderer: React.ComponentType<HistoryListItemProps<T>>;
  title?: string;
  date?: string;
}

export default function HistoryList<T extends WithId>({
  history,
  HistoryRenderer,
  title,
  date,
}: HistoryListProps<T>) {
  const [historyList, setHistory] = useState<T[]>(history);

  // delete a history item from the list
  function deleteHistory(id: number) {
    setHistory((history) => history.filter((item) => item.id !== id));
  }

  if (history.length === 0) {
    return (
      <View style={globalStyles.scrollContainer}>
        <View style={{ flex: 0.75, justifyContent: "center" }}>
          <Text style={globalStyles.title}>No history was found</Text>
        </View>
      </View>
    );
  }

  return (
    <>
      {title &&
      <View style={styles.titleContainer}>
        {title && <Text style={globalStyles.listTitle}>{title}</Text>}
        {date && <Text style={globalStyles.dateTitle}>{settings.convertDate(date)}</Text>}
      </View>}
      <View style={globalStyles.scrollContainer}>
        <FlatList
          data={historyList}
          renderItem={({ item }) => (
            <HistoryRenderer history={item} onDelete={deleteHistory} />
          )}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexWrap: "wrap",
    alignSelf: "stretch",
    paddingHorizontal: 8,
  },
});
