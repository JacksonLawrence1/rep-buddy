import { FlatList, View, Text, Alert, StyleSheet } from "react-native";

import { globalStyles } from "@/constants/styles";
import { useState } from "react";
import {
  DeleteCallback,
  HistoryListItemProps,
  WithId,
} from "./HistoryComponent";
import { colors } from "@/constants/colors";
import settings from "@/constants/settings";

interface HistoryListProps<T extends WithId> {
  history: T[];
  HistoryRenderer: React.ComponentType<HistoryListItemProps<T>>;
  onDelete: DeleteCallback;
  title?: string;
  date?: string;
}

export default function HistoryList<T extends WithId>({
  history,
  HistoryRenderer,
  onDelete,
  title,
  date,
}: HistoryListProps<T>) {
  const [historyList, setHistory] = useState<T[]>(history);

  // pass onDelete at top level, as trying to re-render list from child components would require propogating state up
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
        {title && <Text style={styles.title}>{title}</Text>}
        {date && <Text style={styles.date}>{settings.convertDate(date)}</Text>}
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
  title: {
    fontSize: 24,
    color: colors.text,
    fontFamily: "Rubik-Regular",
  },
  date: {
    fontSize: 16,
    color: colors.textDark,
    fontFamily: "Rubik-Regular",
  },
  titleContainer: {
    flexWrap: "wrap",
    alignSelf: "stretch",
    paddingHorizontal: 8,
  },
});
