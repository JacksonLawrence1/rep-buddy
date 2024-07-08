import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import Alert from "@/components/primitives/Alert";
import { colors } from "@/constants/colors";
import IconButton from "../buttons/IconButton";
import logStore, { LogStore, StorageLog } from "@/services/storage/LogStore";
import settings from "@/constants/settings";
import { router } from "expo-router";
import { createLogBuilderFromStorage } from "@/services/builders/LogBuilder";

export default function ResumePopup() {
  // shows the popup if there is a workout in progress
  const [discontinueAlert, setDiscontinueAlert] = useState(false);
  const [resumeWorkoutAlert, setResumeWorkoutAlert] = useState(false);

  const [log, setLog] = useState<StorageLog | null>(null);

  useEffect(() => {
    // on mount check if there is a workout in progress
    logStore.loadStore().then((store) => {
      // don't show anything if no workout in store
      if (!store) {
        return;
      }

      // assume workout was done if older than 24 hours, and add it to history 
      if (LogStore.isOlderThan24Hours(store)) {
        // for simplicity, make a new log builder as it already parses the storage log
        const log = createLogBuilderFromStorage(store);

        // last updated gets estimate of when finished, instead of using the default current time
        log.addWorkoutToHistory(store.lastUpdated);
        logStore.clearStore();
        return;
      }

      setLog(store);
    });

    // cleanup
    return () => {
      // if somehow alerts are still visible, hide them
      setDiscontinueAlert(false);
      setResumeWorkoutAlert(false);
    }
  }, []);

  function loadWorkoutIntoLog() {
    // correctly setup router for the log
    router.push("/log");

    // go to the log and signal we want to load whatever is there in storage
    // NOTE: if the workout in storage somehow changes during this time, it will load just load the latest workout, instead of what is being displayed in this component. This should never happen, but just a consideration
    router.push({
      pathname: "/log/[id]",
      params: { id: log!.id, inProgress: 'true' },
    });
  }

  async function clearWorkout() {
    // Clear the workout from storage
    logStore.clearStore();
    setLog(null);
  }

  if (!log) {
    return;
  }

  return (
      <View style={styles.modalView}>
        <Pressable style={styles.popupContainer} onPress={() => setResumeWorkoutAlert(true)}>
          <View style={styles.textContainer}>
            <Text style={styles.popupText}>{log.name}</Text>
            <Text style={styles.popupSubtext}>{settings.convertDate(log.date)}</Text>
          </View>
          <IconButton icon="times" onPress={() => setDiscontinueAlert(true)} />
        </Pressable>
        <Alert
          visible={discontinueAlert}
          setVisible={setDiscontinueAlert}
          title="Discontinue Workout?"
          description="You will lose all progress made in this workout, and won't be able to load it again. Are you sure you want to discontinue?"
          submitText="Discontinue"
          onSubmit={() => clearWorkout()}
        />
        <Alert
          visible={resumeWorkoutAlert}
          setVisible={setResumeWorkoutAlert}
          title="Resume Workout?"
          description="You have a workout in progress. Would you like to resume it?"
          submitText="Resume"
          onSubmit={loadWorkoutIntoLog}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  modalView: {
    bottom: 0,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 16,
  },
  popupContainer: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    gap: 16,
    backgroundColor: colors.tertiary,
    borderRadius: 8,
  },
  textContainer: {
    justifyContent: "center",
  },
  popupText: {
    color: colors.text,
    fontSize: 20,
    fontFamily: "Rubik-Regular",
  },
  popupSubtext: {
    color: colors.textDark,
    fontSize: 14,
    fontFamily: "Rubik-Regular",
  },
});
