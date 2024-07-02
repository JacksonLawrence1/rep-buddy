import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";

import { showAlert } from "@/features/alerts";

import historyDatabase from "@/services/database/History";
import { WorkoutHistoryRow } from "@/services/database/WorkoutHistory";

import {
    Delete,
    GenericMenuOption,
    PopoutMenu,
} from "@/components/primitives/PopoutMenus";
import DeleteAlert from "../primitives/DeleteAlert";

import { colors } from "@/constants/colors";
import settings from "@/constants/settings";
import { gotoWorkoutHistoryDetails } from "@/features/routes";

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
  const [deleteAlert, setDeleteAlert] = useState(false);
  const dispatch = useDispatch();

  // route to view details of an single workout entry
  function onViewDetails() {
    gotoWorkoutHistoryDetails(history.id);
  }

  async function handleDelete() {
    try {
      await historyDatabase.deleteWorkoutHistory(history.id);
      onDelete && onDelete(history.id);
    } catch (error) {
      console.error(error);

      dispatch(
        showAlert({
          title: "Error while deleting workout",
          description:
            "There was an error deleting the workout. Please try restarting the app.",
        }),
      );
    }
  }

  const popoutMenuOptions: React.ReactNode[] = [
    // view details of an single workout entry
    <GenericMenuOption
      icon="history"
      label="View Details"
      onPress={onViewDetails}
    />,
  ];

  if (onDelete) {
    popoutMenuOptions.unshift(<Delete onPress={() => setDeleteAlert(true)} />);
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
      {onDelete && (
        <DeleteAlert
          label="History"
          visible={deleteAlert}
          setVisible={setDeleteAlert}
          deleteFunction={handleDelete}
        />
      )}
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
