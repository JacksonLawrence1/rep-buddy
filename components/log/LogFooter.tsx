import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
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
  const [buttonDisabled, setButtonDisabled] = useState(false);

  function saveWorkout() {
    setButtonDisabled(true);

    log
      .save()
      .catch((error) => {
        dispatch(
          showAlert({
            title: "Error while saving",
            description: error.message,
          }),
        );
      })
      .finally(() => {
        router.back();
        setButtonDisabled(false);
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
      {log.id && (
        <Pressable
          style={[styles.iconContainer, { backgroundColor: colors.primary }]}
          onPress={viewHistory}
        >
          <FontAwesome5 name="history" size={24} color={colors.text} />
          <Text style={styles.iconText}>History</Text>
        </Pressable>
      )}
      <View
        style={[
          styles.timerContainer,
          { alignItems: log.id ? "center" : "flex-start" },
        ]}
      >
        <Timer date={log.date} />
      </View>
      <Pressable
        style={[
          styles.iconContainer,
          {
            backgroundColor: buttonDisabled
              ? colors.primaryAccent
              : colors.primary,
          },
        ]}
        onPress={() => !buttonDisabled && setFinish(true)}
      >
        <FontAwesome5 name="flag" size={24} color={colors.text} />
        <Text style={styles.iconText}>Finish</Text>
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
    padding: 12,
  },
  timerContainer: {
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 24, // if we don't have a history button, timer needs to be centered
    flex: 1,
    flexWrap: "nowrap",
  },
  iconText: {
    color: colors.text,
    fontFamily: "Rubik-Regular",
    fontSize: 12,
  },
  iconContainer: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 4,
  },
});
