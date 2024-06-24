import { StyleSheet, Text, View } from "react-native";

import { Delete, GenericMenuOption, PopoutMenu } from "@/components/primitives/PopoutMenus";
import { colors } from "@/constants/colors";
import settings from "@/constants/settings";
import { WorkoutHistoryRow } from "@/services/database/WorkoutHistory";

interface WorkoutHistoryItemProps {
  history: WorkoutHistoryRow;
  onDelete: (id: number) => void;
}

// Only show hours and minutes, and don't show hours if it's 0
function convertDuration(duration: number) {
  let durationString: string = `${duration <= 60 ? duration % 60 : 1}m`;
  const hours = Math.floor(duration / 60);

  if (hours > 0) {
    durationString = `${hours}h ` + durationString;
  }

  return durationString;
}

export default function ExerciseHistoryItem({
  history,
  onDelete,
}: WorkoutHistoryItemProps) {
  const popoutMenuOptions: React.ReactNode[] = [];

  popoutMenuOptions.unshift(
    <GenericMenuOption icon="history" key={1} label="View Workout" onPress={() => {}} />,
  );

  popoutMenuOptions.unshift(
    <Delete key={2} onPress={() => onDelete(history.id)} />,
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.date}>{settings.convertDate(history.date)}</Text>
        <PopoutMenu options={popoutMenuOptions} />
      </View>
      <View style={styles.content}>
        <Text style={styles.duration}>Duration: {convertDuration(history.duration)}</Text>
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
  duration: {
    fontSize: 16,
    color: colors.text,
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
  content: {
    gap: 8,
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 4,
    paddingBottom: 8,
  },
});

