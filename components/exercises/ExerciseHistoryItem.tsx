import { View, Text, StyleSheet } from "react-native";

import { ExerciseHistoryDisplay } from "@/services/database/ExerciseHistory";
import { colors } from "@/constants/colors";
import { Delete, PopoutMenu } from "@/components/primitives/PopoutMenus";
import settings from "@/constants/settings";

interface ExerciseHistoryItemProps {
  history: ExerciseHistoryDisplay;
  onDelete: (id: number) => void;
}

function ColumnTitle({ title }: { title: string }) {
  return (
    <View style={styles.columnTitleContainer}>
      <Text style={styles.columnTitle}>{title}</Text>
    </View>
  );
}

export default function ExerciseHistoryItem({
  history,
  onDelete,
}: ExerciseHistoryItemProps) {
  const popoutMenuOptions: React.ReactNode[] = [];

  popoutMenuOptions.unshift(
    <Delete key={2} onPress={() => onDelete(history.id)} />,
  );

  // reps and weight should always be the same length
  if (history.reps.length !== history.weight.length) {
    console.error("Reps and weight are not the same length");
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.date}>{settings.convertDate(history.date)}</Text>
        <PopoutMenu options={popoutMenuOptions} />
        <Text style={styles.title}>
          {history.workoutName || "Unknown Workout"}
        </Text>
      </View>
      <View style={styles.content}>
        <View style={styles.setColumn}>
          <ColumnTitle title="Set" />
          {history.reps.map((_, index) => (
            <Text key={index} style={styles.columnContent}>
              {index + 1}
            </Text>
          ))}
        </View>
        <View style={styles.weightColumn}>
          <View style={{ width: '100%', paddingHorizontal: 8 }}>
            <ColumnTitle title={`Weight (${settings.weightUnit})`} />
          </View>
          {history.weight.map((item, index) => (
            <Text key={index} style={styles.columnContent}>
              {item}
            </Text>
          ))}
        </View>
        <View style={styles.repsColumn}>
          <ColumnTitle title="Reps" />
          {history.reps.map((item, index) => (
            <Text key={index} style={styles.columnContent}>
              {item}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: 8,
  },
  date: {
    fontSize: 12,
    color: colors.textDark,
  },
  titleContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.tertiary,
    borderRadius: 8,
  },
  title: {
    flexBasis: "100%",
    fontSize: 18,
    fontFamily: "Rubik-Regular",
    color: colors.text,
  },
  content: {
    gap: 8,
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 4,
    paddingBottom: 8,
  },
  setColumn: {
    flex: 0.75,
    alignItems: "center",
    paddingRight: 4,
  },
  weightColumn: {
    flex: 3,
    alignItems: "center",
    borderColor: colors.border,
    borderRightWidth: 1,
    borderLeftWidth: 1,
  },
  repsColumn: {
    flex: 2,
    alignItems: "center",
  },
  columnTitle: {
    fontSize: 14,
    color: colors.text,
    fontFamily: "Rubik-Regular",
  },
  columnTitleContainer: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 2,
    marginBottom: 4,
    borderColor: colors.border,
    borderBottomWidth: 1,
  },
  columnContent: {
    fontSize: 14,
    fontFamily: "Rubik-Regular",
    color: colors.text,
  },
});
