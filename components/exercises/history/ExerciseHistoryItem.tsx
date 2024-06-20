import { View, Text, StyleSheet } from "react-native";

import { ExerciseHistoryDisplay } from "@/services/database/ExerciseHistory";
import { colors } from "@/constants/colors";
import { Delete, PopoutMenu } from "@/components/primitives/PopoutMenus";

interface ExerciseHistoryItemProps {
  history: ExerciseHistoryDisplay;
  onDelete: (id: number) => void;
}

export default function ExerciseHistoryItem({ history, onDelete }: ExerciseHistoryItemProps) {
  const popoutMenuOptions: React.ReactNode[] = [];

  popoutMenuOptions.unshift(<Delete key={2} onPress={() => onDelete(history.id)} />);

  // TODO: change kg to options with settings
  // TODO: parse date to be more readable
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{history.workoutName || "Unknown Workout"}</Text>
        <PopoutMenu options={popoutMenuOptions} />
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>Weight: {history.weight} kg</Text>
        <Text style={styles.text}>Reps: {history.reps}</Text>
        <Text style={styles.date}>Date: {history.date}</Text>
      </View>
    </View>
  );  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.tertiary,
    padding: 8,
    borderRadius: 8,
  },
  content: {
    gap: 4,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    paddingBottom: 8,
  },
  date: {
    fontSize: 12,
    color: colors.text,
  },
  text: {
    fontSize: 16,
    color: colors.text,
  },
});
