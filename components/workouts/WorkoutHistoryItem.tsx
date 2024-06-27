import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import { WorkoutHistoryRow } from "@/services/database/WorkoutHistory";

import {
  Delete,
  GenericMenuOption,
  PopoutMenu,
} from "@/components/primitives/PopoutMenus";

import { colors } from "@/constants/colors";
import settings from "@/constants/settings";
import historyDatabase from "@/services/database/History";

interface WorkoutHistoryItemProps {
  history: WorkoutHistoryRow;
  onDelete?: (id: number) => void;
}

// Only show hours and minutes, and don't show hours if it's 0
export function convertDuration(duration: number) {
  let durationString: string = `${duration <= 60 ? duration % 60 : 1}m`;
  const hours = Math.floor(duration / 60);

  if (hours > 0) {
    durationString = `${hours}h ` + durationString;
  }

  return durationString;
}

export default function WorkoutHistoryItem({
  history,
  onDelete,
}: WorkoutHistoryItemProps) {
  const popoutMenuOptions: React.ReactNode[] = [];

  // route to view details of an single workout entry
  function onViewDetails() {
    router.navigate({
      pathname: "/workouts/history/details/[id]",
      params: { id: history.id },
    });
  }

  // view details of an single workout entry
  popoutMenuOptions.unshift(
    <GenericMenuOption
      icon="history"
      key={1}
      label="View Workout"
      onPress={onViewDetails}
    />,
  );

  if (onDelete) {
    popoutMenuOptions.unshift(
      <Delete key={2} onPress={async () => {
        try {
          await historyDatabase.deleteWorkoutHistory(history.id);
          onDelete(history.id);
        } catch {
          Alert.alert("Error", "There was an error deleting the workout. Please try restarting the app.");
        }
      }} />,
    );
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.titleContainer} onPress={onViewDetails}>
        <Text style={styles.date}>{settings.convertDate(history.date)}</Text>
        <PopoutMenu options={popoutMenuOptions} />
        {history.workout_name && (
          <Text style={styles.title}>{history.workout_name}</Text>
        )}
      </Pressable>
      <View style={styles.content}>
        <Text style={styles.duration}>
          Duration: {convertDuration(history.duration)}
        </Text>
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
  title: {
    flexBasis: "100%",
    fontSize: 18,
    fontFamily: "Rubik-Regular",
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
