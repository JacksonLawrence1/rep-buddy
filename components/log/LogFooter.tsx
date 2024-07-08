import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";

import { showAlert } from "@/features/alerts";
import LogBuilder from "@/services/builders/LogBuilder";

import Alert from "@/components/primitives/Alert";

import { colors } from "@/constants/colors";
import { gotoWorkoutHistory } from "@/features/routes";
import Timer from "./Timer";

interface LogFooterProps {
  log: LogBuilder;
}

export default function LogFooter({ log }: LogFooterProps) {
  const dispatch = useDispatch();
  const [finish, setFinish] = useState(false);

  function saveWorkout() {
    log
      .save()
      .finally(() => {
        router.back();
      })
      .catch((error) => {
        dispatch(
          showAlert({
            title: "Error while saving",
            description: error.message,
          }),
        );
      });
  }

  function viewHistory() {
    // if its a workout from scratch, no id, so we can't view history
    if (!log.id) {
      dispatch(
        showAlert({
          title: "No history",
          description: "This workout has no history to view",
        }),
      );
      return;
    }

    gotoWorkoutHistory(log.id);
  }

  return (
    <View style={styles.footerContainer}>
      <Pressable onPress={viewHistory}>
        <FontAwesome5 name="history" size={32} color={log.id === undefined ? colors.textDark : colors.warning } />
      </Pressable>
      <View style={styles.timerContainer}>
        <Timer date={log.date} />
      </View>
      <Pressable onPress={() => setFinish(true)}>
        <FontAwesome5 name="flag" size={32} color={colors.greenTint} />
      </Pressable>
      <Alert
        visible={finish}
        setVisible={setFinish}
        title="Finish your Workout?"
        description="Are you sure you want to finish the workout? Any unfinished sets won't be recorded."
        onSubmit={saveWorkout}
        submitText="Finish"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: -12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    backgroundColor: colors.tertiary,
    paddingHorizontal: 32,
  },
  timerContainer: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 16,
    flex: 1,
  },
  timerText: {
    color: colors.text,
    fontFamily: "Rubik-Regular",
    fontSize: 38,
  },
});
