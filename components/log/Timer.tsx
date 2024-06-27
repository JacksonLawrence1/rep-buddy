import { View, Text, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";

import LogBuilder, { LogContext } from "@/services/builders/LogBuilder";

import Button from "@/components/buttons/Button";
import Alert from "@/components/primitives/Alert";

import { colors } from "@/constants/colors";
import { router } from "expo-router";

export default function Timer() {
  const log: LogBuilder | null = useContext(LogContext);
  const [timer, setTimer] = useState<string>("00:00:00");
  const [finish, setFinish] = useState(false);

  useEffect(() => {
    if (!log) return;

    const interval = setInterval(() => {
      setTimer(log.duration);
    }, 500); // sometimes skips a second with 1000ms, so we update every 500ms

    return () => {
      clearInterval(interval);
    };
  });

  if (!log) return null;

  function saveWorkout() {
    log!.save().finally(() => {
      router.back();
    }).catch((e) => {
    });
  }

  return (
    <View style={styles.footerContainer}>
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{timer}</Text>
      </View>
      {/* TODO: change where finish icon is */}
      <View style={{flex: 1}}>
        <Button label="Finish" theme="primary" onPress={() => setFinish(true)} />
      </View>
      <Alert visible={finish} setVisible={setFinish} title="Finish your Workout?" description="Are you sure you want to finish the workout? Any unfinished sets won't be recorded." onSubmit={saveWorkout} submitText="Finish" />
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: -12,
    width: "100%",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.tertiary,
    paddingHorizontal: 16,
  },
  timerContainer: {
    flex: 1,
    borderRadius: 8,
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  timerText: {
    color: colors.text,
    fontFamily: "Rubik-Regular",
    fontSize: 38,
  },
});
